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
import * as bcrypt from 'bcryptjs';
import { ReqRefreshTokenDto } from './dto/req.refresh-token.dto';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { ReqGoogleTokenDto } from './dto/req.gg-token.dto';
import { ResMailDto } from '../mail/dto/mail-reponse.dto';
import { MailService } from '../mail/mail.service';
import { ReqForgotPasswordDto } from './dto/req.forgot-password.dto';
import { ReqResetPasswordDto } from './dto/req.reset-password.dto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { SentMessageInfo } from 'nodemailer';
import { ReqVerifyEmailDto } from './dto/req.verify-email.dto';
import { PlanEntity } from '../plan/plan.entity';
import { PlanCourseEntity } from '../plan-course/plan-course.entity';
import { UUID } from 'crypto';

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
    @InjectRepository(PlanEntity)
    private readonly planRepository: Repository<PlanEntity>,
    @InjectRepository(PlanCourseEntity)
    private readonly planCourseRepository: Repository<PlanCourseEntity>,
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
    const token = await this.generateTokenVerifyAccount({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });
    const link = `${this.configService.get<string>('FE_URL')}/auth/verify-email?token=${token}`;
    const mailResult: SentMessageInfo =
      await this.mailService.sendEmailVerifyEmail(dto.email, link);

    return new ResMailDto(
      mailResult?.envelope?.from,
      mailResult?.envelope?.to[0],
    );
  }

  async verifySignup(dto: ReqVerifyEmailDto) {
    let payload = null;
    try {
      payload = await this.verifyAccessToken(dto.token);
    } catch (e) {
      throw new UnauthorizedException({
        message: 'Verify email failed.',
        error: e.message,
      });
    }
    const user = await this.userService.createUser({
      name: payload.name,
      email: payload.email,
      password: await bcrypt.hash(payload.password, 10),
    });
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
      avatar: user.avatar,
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
    const client = new OAuth2Client();
    async function verify() {
      const ticket = await client.getTokenInfo(token);
      return ticket;
    }
    let result = null;
    try {
      result = await verify().catch(console.error);
    } catch (err) {
      throw new UnauthorizedException({
        message: 'Invalid google token',
      });
    }
    return result;
  }

  async authGoogle(dto: ReqGoogleTokenDto): Promise<ResTokenDto> {
    const profile = await this.verifyGoogleToken(dto.googleAccessToken);

    const queryBuilder = this.usersRepository.createQueryBuilder('user');
    let user = await queryBuilder
      .where(`user.email = '${profile.email}'`)
      .getOne();
    if (!user) {
      const radomPassword = genarateRandomPassword();
      user = await this.usersRepository.create({
        email: profile.email,
        password: await bcrypt.hash(radomPassword, 10),
        name: profile.name,
        avatar: profile.picture,
      });
      await this.usersRepository.save(user);
      await this.mailService.sendEmailDefaultPassword(
        profile.email,
        radomPassword,
      );
    } else {
      user.avatar = profile.picture;
      user.name = profile.name;
      await this.usersRepository.save(user);
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

    const accessToken = (await this.generateTokens(user)).accessToken;
    const link = `${this.configService.get<string>('FE_URL')}/auth/reset-password?token=${accessToken}`;
    const mailResult: SentMessageInfo =
      await this.mailService.sendEmailResetPassword(dto.email, link);

    return new ResMailDto(
      mailResult?.envelope?.from,
      mailResult?.envelope?.to[0],
    );
  }

  async resetPassword(dto: ReqResetPasswordDto): Promise<ResTokenDto> {
    const payload = await this.verifyAccessToken(dto.token);
    let user = await this.usersRepository.findOneBy({ email: payload.email });
    user.password = await bcrypt.hash(dto.newPassword, 10);
    user = await this.usersRepository.save(user);
    return this.generateTokens(user);
  }

  async verifyToken(token, secret: string) {
    return this.jwtService.verifyAsync(token, {
      secret,
    });
  }

  async verifyAccessToken(token) {
    return this.verifyToken(token, this.configService.get('JWT_SECRET'));
  }

  async verifyRefreshToken(token) {
    return this.verifyToken(token, this.configService.get('JWT_SECRET'));
  }

  async generateTokenVerifyAccount(payload) {
    return this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });
  }

  async verifyTokenVerifyAccount(token) {
    return this.verifyToken(token, this.configService.get('JWT_SECRET'));
  }

  async getMe(accessToken: string) {
    return this.verifyAccessToken(accessToken);
  }

  async isOwnerPlan(user: UserEntity, planId: UUID): Promise<boolean> {
    const plan = await this.planRepository.findOneBy({ id: planId });
    if (!plan) {
      return false;
    }
    return user.id === plan.ownerId;
  }

  async isOwnerPlanCourse(
    user: UserEntity,
    planCourseId: UUID,
  ): Promise<boolean> {
    const planCourse = await this.planCourseRepository
      .createQueryBuilder('planCourse')
      .where(`planCourse.id = '${planCourseId}'`)
      .leftJoinAndSelect('planCourse.plan', 'plan')
      .getOne();
    if (!planCourse) {
      return false;
    }
    return user.id === planCourse.plan.ownerId;
  }
}

function genarateRandomPassword() {
  return Math.random().toString(36).slice(-8);
}
