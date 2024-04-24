import { UnauthorizedException } from '@nestjs/common';
import { ErrorCode } from '../error-code';

export class InvalidTokenException extends UnauthorizedException {
  constructor() {
    super({
      message: 'Authorization token invalid or expired.',
      statusCode: ErrorCode.UNAUTHORIZED_401.expired,
    });
  }
}
