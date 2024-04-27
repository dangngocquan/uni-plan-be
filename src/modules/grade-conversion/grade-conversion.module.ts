import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeConversionEntity } from './entity/grade-conversion.entity';
import { GradeConversionTableEntity } from './entity/grade-conversion-table.entity';
import { GradeConversionController } from './grade-conversion.controller';
import { GradeConversionService } from './grade-conversion.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GradeConversionEntity,
      GradeConversionTableEntity,
    ]),
  ],
  controllers: [GradeConversionController],
  providers: [GradeConversionService],
  exports: [GradeConversionService],
})
export class GradeConversionModule {}
