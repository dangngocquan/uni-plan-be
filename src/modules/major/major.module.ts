import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MajorEntity } from './major.entity';
import { MajorController } from './major.controller';
import { MajorService } from './major.service';
import { SchoolEntity } from '../school/school.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MajorEntity, SchoolEntity])],
  controllers: [MajorController],
  providers: [MajorService],
  exports: [MajorService],
})
export class MajorModule {}
