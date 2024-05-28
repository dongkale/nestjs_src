import { Injectable, Inject } from '@nestjs/common';
import { Product } from '@/domain/models/product';
import { IProductRepository } from '@/domain/ports/product.repository';
import { Optional } from 'typescript-optional';

@Injectable()
export default class GetProductUseCase {
  constructor(
    @Inject(IProductRepository) private productRepository: IProductRepository,
  ) {}

  public handler(productId: number): Promise<Optional<Product>> {
    return this.productRepository.getProduct(productId);
  }
}
