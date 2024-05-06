import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MajorEntity } from './major.entity';
import { MajorController } from './major.controller';
import { MajorService } from './major.service';
import { SchoolEntity } from '../school/school.entity';
import { GroupCourseModule } from '../group-course/group-course.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MajorEntity, SchoolEntity]),
    GroupCourseModule,
  ],
  controllers: [MajorController],
  providers: [MajorService],
  exports: [MajorService],
})
export class MajorModule {}
