import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationOptionsDto } from '../../../shared/dto/pagination/pagination.option.dto';
import { UUID } from 'crypto';

export class PageOptionMajorDto extends PaginationOptionsDto {
  @ApiPropertyOptional()
  schoolId: UUID;
}
