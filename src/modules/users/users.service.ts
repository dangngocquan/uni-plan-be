import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReqSignUpDto } from '../auth/dto/req.signup.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: ReqSignUpDto): Promise<UserEntity> {
    const user = this.usersRepository.create(dto);
    return this.usersRepository.save(user);
  }
}
