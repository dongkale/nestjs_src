import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@/domain/models/product';
import { ProductEntity } from '@/infrastructure/adapters/repository/entity/product.entity';
import { Optional } from 'typescript-optional';
// import ProductMapper from '../../mapper/product.mapper';
import { IProductRepository } from '@/domain/ports/product.repository';

@Injectable()
export default class ProductRepositoryTypeorm implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productModel: Repository<ProductEntity>,
  ) {}

  async getAll(): Promise<Product[]> {
    const products = await this.productModel.find();
    // return ProductMapper.toDomains(products);
    return products.map((product: ProductEntity) => {
      return new Product(
        product.id,
        product.name,
        product.description,
        product.imageUrl,
        product.price,
      );
    });
  }

  public async createProduct(product: Product): Promise<Optional<Product>> {
    const createdProduct = this.productModel.create({ ...product });
    const savedProduct = await this.productModel.save(createdProduct);

    // return ProductMapper.toDomain(productCreated);
    return Optional.of(
      new Product(
        savedProduct.id,
        savedProduct.name,
        savedProduct.description,
        savedProduct.imageUrl,
        savedProduct.price,
      ),
    );
  }

  public async getProduct(productId: number): Promise<Optional<Product>> {
    const product = await this.productModel.findOne({
      where: { id: productId },
    });
    if (!product) {
      return Optional.empty();
    }

    // return ProductMapper.toDomain(product);
    return Optional.of(
      new Product(
        product.id,
        product.name,
        product.description,
        product.imageUrl,
        product.price,
      ),
    );
  }

  public async deleteProduct(productId: number): Promise<Optional<Product>> {
    const product = await this.productModel.findOne({
      where: { id: productId },
    });
    if (!product) {
      return Optional.empty();
    }

    const deletedProduct = new Product(
      product.id,
      product.name,
      product.description,
      product.imageUrl,
      product.price,
    );

    const deleted = await this.productModel.delete(productId);
    if (!deleted) {
      return Optional.empty();
    }

    // return ProductMapper.toDomain(product);
    return Optional.of(deletedProduct);
  }

  public async updateProduct(
    productId: number,
    product: Product,
  ): Promise<Optional<Product>> {
    // const productUpdated = await this.productModel.update(productId, product);
    // return ProductMapper.toDomain(productUpdated);
    const createdTicket = this.productModel.create({
      ...product,
      id: productId,
    });
    await this.productModel.update(productId, createdTicket);

    const updatedProduct = await this.productModel.findOne({
      where: { id: productId },
    });
    if (!updatedProduct) {
      return Optional.empty();
    }

    return Optional.of(
      new Product(
        updatedProduct.id,
        updatedProduct.name,
        updatedProduct.description,
        updatedProduct.imageUrl,
        updatedProduct.price,
      ),
    );
  }
}
