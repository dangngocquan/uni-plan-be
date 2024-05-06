import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ormconfig from './config/ormconfig';
import { CacheModule } from '@nestjs/cache-manager';
import { MailModule } from './modules/mail/mail.module';
import { UsersModule } from './modules/users/users.module';
import { SchoolModule } from './modules/school/school.module';
import { MajorModule } from './modules/major/major.module';
// import { OpenAIModule } from './modules/openai/openai.module';
// import { GoogleAIModule } from './modules/google-ai/googleai.module';
import { GroupCourseModule } from './modules/group-course/group-course.module';
import { CourseModule } from './modules/course/course.module';
import { GradeConversionModule } from './modules/grade-conversion/grade-conversion.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormconfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('ormconfig'),
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 120000, // milliseconds
      max: 100, // maximum number of items in cache
    }),
    MailModule,
    UsersModule,
    SchoolModule,
    MajorModule,
    // OpenAIModule,
    // GoogleAIModule,
    GroupCourseModule,
    CourseModule,
    GradeConversionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
