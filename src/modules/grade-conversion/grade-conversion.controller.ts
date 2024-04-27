import { Controller } from '@nestjs/common';
import { GradeConversionService } from './grade-conversion.service';

@Controller('grade-conversion')
export class GradeConversionController {
  constructor(
    private readonly gradeConversionService: GradeConversionService,
  ) {}
}
