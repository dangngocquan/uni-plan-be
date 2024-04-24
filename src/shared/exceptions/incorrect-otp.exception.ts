import { BadRequestException } from '@nestjs/common';
import { ErrorCode } from '../error-code';

export class InvalidOTPCodeException extends BadRequestException {
  constructor() {
    super({
      message: 'OTP code incorrect or expired.',
      errorCode: ErrorCode.BAD_REQUEST_400.invalid,
    });
  }
}
