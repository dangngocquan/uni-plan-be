import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAuthController } from './controllers/admin.auth.controller';
import { AdminService } from './admin.service';
import { UserEntity } from '../users/user.entity';
import { AdminSchoolController } from './controllers/admin.school.controller';
import { AdminMajorController } from './controllers/admin.major.controller';
import { AdminCourseController } from './controllers/admin.course.controller';
import { AuthModule } from '../auth/auth.module';
import { SchoolModule } from '../school/school.module';
import { MajorModule } from '../major/major.module';
import { CourseModule } from '../course/course.module';
import { GroupCourseModule } from '../group-course/group-course.module';
import { GradeConversionModule } from '../grade-conversion/grade-conversion.module';
import { AdminGradeConversionController } from './controllers/admin.grade-conversion.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
    SchoolModule,
    MajorModule,
    CourseModule,
    GroupCourseModule,
    GradeConversionModule,
  ],
  controllers: [
    AdminAuthController,
    AdminSchoolController,
    AdminMajorController,
    AdminCourseController,
    AdminGradeConversionController,
  ],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
