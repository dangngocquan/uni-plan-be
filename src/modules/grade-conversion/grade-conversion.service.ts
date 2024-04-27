import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GradeConversionEntity } from './entity/grade-conversion.entity';
import { Repository } from 'typeorm';
import { GradeConversionTableEntity } from './entity/grade-conversion-table.entity';

@Injectable()
export class GradeConversionService {
  constructor(
    @InjectRepository(GradeConversionEntity)
    private readonly gradeConversionRepository: Repository<GradeConversionEntity>,
    @InjectRepository(GradeConversionTableEntity)
    private readonly gradeConversionTableRepository: Repository<GradeConversionTableEntity>,
  ) {}
}
