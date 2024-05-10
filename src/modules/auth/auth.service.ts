import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ResTokenDto } from './dto/res.token.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ReqSignUpDto } from './dto/req.signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/user.entity';
import { Repository } from 'typeorm';
import { ReqLoginDto } from './dto/req.login.dto';
import * as bcrypt from 'bcrypt';
import { ReqRefreshTokenDto } from './dto/req.refresh-token.dto';
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';
import { ReqGoogleTokenDto } from './dto/req.gg-token.dto';
import { ResMailDto } from '../mail/dto/mail-reponse.dto';
import { MailService } from '../mail/mail.service';
import { ReqForgotPasswordDto } from './dto/req.forgot-password.dto';
import { ReqResetPasswordDto } from './dto/req.reset-password.dto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { SentMessageInfo } from 'nodemailer';
import { ReqVerifyEmailDto } from './dto/req.verify-email.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly mailService: MailService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async signup(dto: ReqSignUpDto): Promise<ResMailDto> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');
    const user = await queryBuilder
      .where(`user.email = '${dto.email}'`)
      .getOne();
    if (user) {
      throw new ConflictException({
        message: 'Email already exists',
      });
    }
    const otp = (1000000 + Math.round(Math.random() * 999999))
      .toString()
      .slice(1);
    await this.cacheManager.set('signup-' + dto.email + '-' + otp, dto, 300000);
    const mailResult: SentMessageInfo =
      await this.mailService.sendEmailVerifySignup(dto.email, otp);

    return new ResMailDto(
      mailResult?.envelope?.from,
      mailResult?.envelope?.to[0],
    );
  }

  async verifySignup(dto: ReqVerifyEmailDto) {
    // Check email-otp in Cache
    const cacheUser: ReqSignUpDto = await this.cacheManager.get(
      'signup-' + dto.email + '-' + dto.otp,
    );
    if (!cacheUser) {
      throw new UnauthorizedException({
        message: 'Invalid OTP',
      });
    }
    // Delete email-otp from Cache
    await this.cacheManager.del('forget-' + dto.email + '-' + dto.otp);
    // Create account
    cacheUser.password = await bcrypt.hash(cacheUser.password, 10);
    const user = await this.userService.createUser(cacheUser);
    return this.generateTokens(user);
  }

  async login(dto: ReqLoginDto): Promise<ResTokenDto> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where(`user.email = '${dto.email}'`)
      .getOne();
    if (!user) {
      throw new UnauthorizedException({
        message: 'User not found',
      });
    }
    if (!dto.password) {
      throw new UnauthorizedException({
        message: 'Email or password is incorrect',
      });
    }
    const isMatchPassword = await bcrypt.compare(dto.password, user.password);
    if (!isMatchPassword) {
      throw new UnauthorizedException({
        message: 'Email or password is incorrect',
      });
    }
    return this.generateTokens(user);
  }

  async refreshToken(dto: ReqRefreshTokenDto): Promise<ResTokenDto> {
    try {
      const decoded = await this.jwtService.verifyAsync(dto.refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      const user = await this.usersRepository
        .createQueryBuilder('user')
        .where(`user.id = '${decoded.id}'`)
        .getOne();
      return this.generateTokens(user);
    } catch (err) {
      throw new UnauthorizedException({
        message: 'Invalid refresh token',
      });
    }
  }

  async generateTokens(user: UserEntity): Promise<ResTokenDto> {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      ),
    });
    const referToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      ),
    });
    return new ResTokenDto(accessToken, referToken);
  }

  async verifyGoogleToken(token: string): Promise<TokenPayload> {
    const client = new OAuth2Client(
      this.configService.get<string>('GOOGLE_CLIENT_ID'),
      this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
    );
    let ticket: LoginTicket;

    try {
      ticket = await client.verifyIdToken({
        idToken: token,
        audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
      });
    } catch {
      throw new UnauthorizedException({
        message: 'Invalid google token',
      });
    }

    return ticket.getPayload();
  }

  async signupByGoogle(dto: ReqGoogleTokenDto): Promise<ResTokenDto> {
    const profile = await this.verifyGoogleToken(dto.idToken);

    const queryBuilder = this.usersRepository.createQueryBuilder('user');
    let user = await queryBuilder
      .where(`user.email = '${profile.email}'`)
      .getOne();
    if (user) {
      return this.generateTokens(user);
    }
    user = await this.userService.createUser(
      new ReqSignUpDto(profile.email, null, profile.name),
    );
    return this.generateTokens(user);
  }

  async loginByGoogle(dto: ReqGoogleTokenDto): Promise<ResTokenDto> {
    const profile = await this.verifyGoogleToken(dto.idToken);

    const queryBuilder = this.usersRepository.createQueryBuilder('user');
    const user = await queryBuilder
      .where(`user.email = '${profile.email}'`)
      .getOne();
    if (!user) {
      throw new UnauthorizedException({
        message: 'User not found',
      });
    }
    return this.generateTokens(user);
  }

  async forgotPassword(dto: ReqForgotPasswordDto): Promise<ResMailDto> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where(`user.email = '${dto.email}'`)
      .getOne();

    if (!user) {
      throw new UnauthorizedException({
        message: 'User not found',
      });
    }

    const otp = (1000000 + Math.round(Math.random() * 999999))
      .toString()
      .slice(1);
    await this.cacheManager.set(
      'forget-' + dto.email + '-' + otp,
      {
        email: dto.email,
      },
      300000,
    );
    const mailResult: SentMessageInfo =
      await this.mailService.sendEmailResetPassword(dto.email, otp);

    return new ResMailDto(
      mailResult?.envelope?.from,
      mailResult?.envelope?.to[0],
    );
  }

  async resetPassword(dto: ReqResetPasswordDto): Promise<ResTokenDto> {
    // Check email-otp in Cache
    const cacheUser = await this.cacheManager.get(
      'forget-' + dto.email + '-' + dto.otp,
    );
    if (!cacheUser) {
      throw new UnauthorizedException({
        message: 'Invalid OTP code',
      });
    }
    // Delete email-otp from Cache
    await this.cacheManager.del('forget-' + dto.email + '-' + dto.otp);
    // Update password
    let user = await this.usersRepository.findOneBy({ email: dto.email });
    user.password = await bcrypt.hash(dto.newPassword, 10);
    user = await this.usersRepository.save(user);
    return this.generateTokens(user);
  }
}
