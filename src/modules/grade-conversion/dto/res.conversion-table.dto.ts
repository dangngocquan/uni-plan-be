import { ApiProperty } from '@nestjs/swagger';
import { ResGradeConversionDto } from './res.conversion.dto';

export class ResGradeConversionTableDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({
    isArray: true,
    type: ResGradeConversionDto,
  })
  gradeConversions: ResGradeConversionDto[];
}
