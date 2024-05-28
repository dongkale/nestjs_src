import { Injectable, Inject } from '@nestjs/common';
import { Product } from '@/domain/models/product';
import { IProductRepository } from '@/domain/ports/product.repository';

@Injectable()
export default class GetAllProductsUseCase {
  constructor(
    @Inject(IProductRepository) private productRepository: IProductRepository,
  ) {}

  public handler(): Promise<Product[]> {
    return this.productRepository.getAll();
  }
}
