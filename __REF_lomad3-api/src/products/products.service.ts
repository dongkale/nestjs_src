import { Injectable } from '@nestjs/common';

import { InjectModel } from 'nest-knexjs';

import { DatabaseService } from '@/common/database.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel() private readonly databaseService: DatabaseService,
  ) {}
}
