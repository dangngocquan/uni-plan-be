import { ConflictException } from '@nestjs/common';
import { ErrorCode } from '../error-code';

export class UsernameExistException extends ConflictException {
  constructor() {
    super({
      message: 'Username already exists.',
      statusCode: ErrorCode.CONFLICT_409.duplicate,
    });
  }
}
