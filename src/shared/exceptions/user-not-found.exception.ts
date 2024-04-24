import { NotFoundException } from '@nestjs/common';
import { ErrorCode } from '../error-code';

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super({
      message: 'User not found.',
      statusCode: ErrorCode.NOT_FOUND_404.notFound,
    });
  }
}
