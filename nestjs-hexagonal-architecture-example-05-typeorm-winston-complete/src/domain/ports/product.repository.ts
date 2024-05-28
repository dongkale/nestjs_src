import { Product } from '@/domain/models/product';
import { Optional } from 'typescript-optional';

export interface IProductRepository {
  getAll(): Promise<Product[]>;

  /**
   * Returns product filtered by id
   * @param {string} productId
   * @returns a `Product` object containing the data.
   */
  getProduct(productId: number): Promise<Optional<Product>>;

  createProduct(product: Product): Promise<Optional<Product>>;

  deleteProduct(productId: number): Promise<Optional<Product>>;

  updateProduct(
    productId: number,
    product: Product,
  ): Promise<Optional<Product>>;
}

export const IProductRepository = Symbol('IProductRepository');
