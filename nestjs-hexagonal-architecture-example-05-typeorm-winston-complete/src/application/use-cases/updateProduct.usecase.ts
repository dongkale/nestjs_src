import { Injectable, Inject } from '@nestjs/common';
import { Product } from '@/domain/models/product';
import { IProductRepository } from '@/domain/ports/product.repository';
import { Optional } from 'typescript-optional';

@Injectable()
export default class UpdateProductUseCase {
  constructor(
    @Inject(IProductRepository) private productRepository: IProductRepository,
  ) {}

  public handler(
    productId: number,
    product: Product,
  ): Promise<Optional<Product>> {
    return this.productRepository.updateProduct(productId, product);
  }
}
