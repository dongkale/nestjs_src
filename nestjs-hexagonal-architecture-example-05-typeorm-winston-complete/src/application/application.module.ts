import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import GetAllProductsUseCase from '@/application/use-cases/getAllProducts.usecase';
import DomainModule from '@/domain/domain.module';
import GetProductUseCase from '@/application/use-cases/getProduct.usecase';
import CreateProductUseCase from '@/application/use-cases/createProduct.usecase';
import DeleteProductUseCase from '@/application/use-cases/deleteProduct.usecase';
import UpdateProductUseCase from '@/application/use-cases/updateProduct.usecase';
import ProductFactory from '@/application/factory/product.factory';
import { IProductRepository } from '@/domain/ports/product.repository';
import { ProductEntity } from '@/infrastructure/adapters/repository/entity/product.entity';
import ProductRepositoryTypeorm from '@/infrastructure/adapters/repository/product.repository.typeorm';

@Module({
  imports: [DomainModule, TypeOrmModule.forFeature([ProductEntity])],
  providers: [
    ProductFactory,
    GetAllProductsUseCase,
    GetProductUseCase,
    CreateProductUseCase,
    DeleteProductUseCase,
    UpdateProductUseCase,
    {
      provide: IProductRepository,
      useClass: ProductRepositoryTypeorm,
    },
  ],
  exports: [
    ProductFactory,
    GetAllProductsUseCase,
    GetProductUseCase,
    CreateProductUseCase,
    DeleteProductUseCase,
    UpdateProductUseCase,
  ],
})
export default class ApplicationModule {}
