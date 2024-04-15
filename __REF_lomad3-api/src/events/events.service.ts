import { Injectable } from '@nestjs/common';

import { InjectModel } from 'nest-knexjs';

import { DatabaseService } from '@/common/database.service';
import { ProductsService } from '@/products/products.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel() private readonly databaseService: DatabaseService,
    private readonly productsService: ProductsService,
  ) {}
}
