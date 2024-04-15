import { Injectable } from '@nestjs/common';

import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class DatabaseService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  table(tableName) {
    return this.knex(tableName);
  }
}
