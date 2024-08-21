import { Module } from '@nestjs/common';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';
import { PlanEntity } from './plan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { GradeConversionModule } from '../grade-conversion/grade-conversion.module';
import { GradeConversionEntity } from '../grade-conversion/entity/grade-conversion.entity';
import { GradeConversionTableEntity } from '../grade-conversion/entity/grade-conversion-table.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlanEntity,
      GradeConversionEntity,
      GradeConversionTableEntity,
    ]),
    AuthModule,
    GradeConversionModule,
  ],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService],
})
export class PlanModule {}
