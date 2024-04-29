import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupCourseEntity } from './entity/group-course.entity';
import { Repository } from 'typeorm';
import { GroupCourseRelationEntity } from './entity/group-course-relation.entity';

@Injectable()
export class GroupCourseService {
  constructor(
    @InjectRepository(GroupCourseEntity)
    private readonly groupCourseRepository: Repository<GroupCourseEntity>,
    @InjectRepository(GroupCourseRelationEntity)
    private readonly groupCourseRelationRepository: Repository<GroupCourseRelationEntity>,
  ) {}
}
