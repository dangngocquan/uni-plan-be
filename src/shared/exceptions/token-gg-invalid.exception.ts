import { UnauthorizedException } from '@nestjs/common';
import { ErrorCode } from '../error-code';

export class InvalidGoogleTokenException extends UnauthorizedException {
  constructor() {
    super({
      message: 'Authorization google token invalid or expired.',
      statusCode: ErrorCode.UNAUTHORIZED_401.authError,
    });
  }
}
