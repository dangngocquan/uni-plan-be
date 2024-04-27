import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupCourseEntity } from './entity/group-course.entity';
import { GroupCourseRelationEntity } from './entity/group-course-relation.entity';
import { GroupCourseController } from './group-course.controller';
import { GroupCourseService } from './group-course.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupCourseEntity, GroupCourseRelationEntity]),
  ],
  controllers: [GroupCourseController],
  providers: [GroupCourseService],
  exports: [GroupCourseService],
})
export class GroupCourseModule {}
