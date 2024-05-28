import { Injectable, Inject } from '@nestjs/common';
import { Product } from '@/domain/models/product';
import { IProductRepository } from '@/domain/ports/product.repository';
import { Optional } from 'typescript-optional';
import ProductCommand from '@/application/commands/product.command';
import ProductFactory from '@/application/factory/product.factory';

@Injectable()
export default class CreateProductUseCase {
  constructor(
    @Inject(IProductRepository) private productRepository: IProductRepository,
    private productFactory: ProductFactory,
  ) {}

  public handler(productCommand: ProductCommand): Promise<Optional<Product>> {
    // const product = this.productFactory.createProduct(productCommand);
    const product = new Product(
      0,
      productCommand.name,
      productCommand.description,
      productCommand.imageUrl,
      productCommand.price,
    );

    return this.productRepository.createProduct(product);
  }
}
