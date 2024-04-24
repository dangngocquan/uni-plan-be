import { UnauthorizedException } from '@nestjs/common';
import { ErrorCode } from '../error-code';

export class TokenNotFound extends UnauthorizedException {
  constructor() {
    super({
      message: 'Authorization token not found',
      statusCode: ErrorCode.UNAUTHORIZED_401.authError,
    });
  }
}
