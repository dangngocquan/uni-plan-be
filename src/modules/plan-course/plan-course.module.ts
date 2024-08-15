import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanCourseController } from './plan-course.controller';
import { PlanCourseEntity } from './plan-course.entity';
import { PlanCourseService } from './plan-course.service';
import { CourseEntity } from '../course/entity/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlanCourseEntity, CourseEntity])],
  controllers: [PlanCourseController],
  providers: [PlanCourseService],
  exports: [PlanCourseService],
})
export class PlanCourseModule {}
