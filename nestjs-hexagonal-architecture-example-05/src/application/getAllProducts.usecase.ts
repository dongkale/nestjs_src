import { Injectable, Inject } from '@nestjs/common';
import Product from '@/domain/product';
import { ProductRepository } from '@/domain/ports/product.repository';

@Injectable()
export default class GetAllProductsUseCase {
  constructor(
    @Inject('ProductRepository') private productRepository: ProductRepository,
  ) {}

  public handler(): Promise<Product[]> {
    return this.productRepository.getAll();
  }
}
