import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';
import { SetMetadata } from '@nestjs/common';
import { UserAuthGuard } from '../guards/auth-user.guard';
import { UserEntity } from '../../modules/users/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Auth(): MethodDecorator {
  return applyDecorators(UseGuards(UserAuthGuard), ApiBearerAuth());
}

export function AuthUser() {
  return createParamDecorator((_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    return request['user'] as UserEntity;
  })();
}

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
