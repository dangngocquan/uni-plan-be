import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
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
import { AuthMiddleware } from './modules/auth/middleware/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot:
        process.env.NODE_ENV === 'development' ? '/' : '/documentation',
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
    JwtModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/(.*)', method: RequestMethod.GET },
        { path: 'auth/(.*)', method: RequestMethod.POST },
        { path: 'admin/auth/login', method: RequestMethod.POST },
      )
      .forRoutes('*');

    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'auth/me', method: RequestMethod.GET });
  }
}
