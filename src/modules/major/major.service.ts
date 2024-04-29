import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MajorEntity } from './major.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MajorService {
  constructor(
    @InjectRepository(MajorEntity)
    private readonly majorRepository: Repository<MajorEntity>,
  ) {}
}
