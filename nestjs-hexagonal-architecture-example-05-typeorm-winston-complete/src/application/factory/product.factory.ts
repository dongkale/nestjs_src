/* eslint-disable class-methods-use-this */
import { Injectable } from '@nestjs/common';
import { Product } from '@/domain/models/product';
import ProductCommand from '@/application/commands/product.command';

@Injectable()
export default class ProductFactory {
  public createProduct(productCommand: ProductCommand): Product {
    return new Product(
      0,
      productCommand.name,
      productCommand.description,
      productCommand.imageUrl,
      productCommand.price,
    );
  }
}
