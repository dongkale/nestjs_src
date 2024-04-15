import { Injectable } from '@nestjs/common';

import { InjectModel } from 'nest-knexjs';

import { DatabaseService } from '@/common/database.service';

@Injectable()
export class MyService {
  constructor(
    @InjectModel() private readonly databaseService: DatabaseService,
  ) {}
}
