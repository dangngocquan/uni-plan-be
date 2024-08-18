import { ApiProperty } from '@nestjs/swagger';

export class ResCreatePlanCourseDto {
  @ApiProperty()
  planId: string;
}
