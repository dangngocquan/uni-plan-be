import { Controller } from '@nestjs/common';
import { GroupCourseService } from './group-course.service';

@Controller('group-course')
export class GroupCourseController {
  constructor(private readonly groupCourseService: GroupCourseService) {}
}
