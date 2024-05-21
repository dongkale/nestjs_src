import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductRepository } from 'src/core/domain/ports/outbound/ProductRepository';
import { ProductEntity } from '../northwind-database/entities/product.entity';
import { Product } from 'src/core/domain/entities/Product';

@Injectable()
export class ProductRepositoryAdapter implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  async save(p: Product) {
    return this.repository.save(p);
  }
}
