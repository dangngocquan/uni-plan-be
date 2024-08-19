import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanCourseController } from './plan-course.controller';
import { PlanCourseEntity } from './plan-course.entity';
import { PlanCourseService } from './plan-course.service';
import { CourseEntity } from '../course/entity/course.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlanCourseEntity, CourseEntity]),
    AuthModule,
  ],
  controllers: [PlanCourseController],
  providers: [PlanCourseService],
  exports: [PlanCourseService],
})
export class PlanCourseModule {}
