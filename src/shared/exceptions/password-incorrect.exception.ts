import { UnauthorizedException } from '@nestjs/common';
import { ErrorCode } from '../error-code';

export class PasswordIncorrectException extends UnauthorizedException {
  constructor() {
    super({
      message: 'Password is incorrect.',
      errorCode: ErrorCode.UNAUTHORIZED_401.authError,
    });
  }
}
