import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entity/course.entity';
import { CourseRelationEntity } from './entity/course-relation.entity';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { GroupCourseEntity } from '../group-course/entity/group-course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CourseEntity,
      CourseRelationEntity,
      GroupCourseEntity,
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
