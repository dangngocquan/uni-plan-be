import { ConflictException } from '@nestjs/common';
import { ErrorCode } from '../error-code';

export class EmailExistException extends ConflictException {
  constructor() {
    super({
      message: 'Email already exists.',
      errorCode: ErrorCode.CONFLICT_409.duplicate,
    });
  }
}
