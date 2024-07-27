import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/user.entity';
import { ReqLoginDto } from '../auth/dto/req.login.dto';
import { ResTokenDto } from '../auth/dto/res.token.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { Role } from '../users/role.enum';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,

    private readonly authService: AuthService,
  ) {}

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
    if (user.role !== Role.ADMIN) {
      throw new UnauthorizedException({
        message: 'You are not administrator',
      });
    }
    return this.authService.generateTokens(user);
  }
}
