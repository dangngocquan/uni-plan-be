import { ApiProperty } from '@nestjs/swagger';
import { CreateGradeConversionDto } from './req.create-conversion.dto';

export class CreateGradeConversionTableDto {
  @ApiProperty()
  name: string;

  @ApiProperty({
    isArray: true,
    type: CreateGradeConversionDto,
  })
  gradeConversions: CreateGradeConversionDto[];
}
