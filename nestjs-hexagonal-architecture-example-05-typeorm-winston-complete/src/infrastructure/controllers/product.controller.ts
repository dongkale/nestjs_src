import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  Logger,
} from '@nestjs/common';
import ProductCommand from '@/application/commands/product.command';
import GetAllProductsUseCase from '@/application/use-cases/getAllProducts.usecase';
import GetProductUseCase from '@/application/use-cases/getProduct.usecase';
import { Product } from '@/domain/models/product';
import CreateProductUseCase from '@/application/use-cases/createProduct.usecase';
import DeleteProductUseCase from '@/application/use-cases/deleteProduct.usecase';
import UpdateProductUseCase from '@/application/use-cases/updateProduct.usecase';
import { Response } from 'express';

@Controller('products/')
export default class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(
    private getAllProductsUseCase: GetAllProductsUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
  ) {}

  @Get()
  public async getProducts(@Res() request: Response): Promise<any> {
    const products = await this.getAllProductsUseCase.handler();

    this.logger.log(JSON.stringify(products, null, 2));

    return request.status(HttpStatus.OK).json(products);
  }

  @Get(':id')
  public async getProduct(
    @Res() request: Response,
    @Param('id') id: number,
  ): Promise<any> {
    const product = await this.getProductUseCase.handler(id);

    this.logger.log(JSON.stringify(product, null, 2));

    return request.status(HttpStatus.OK).json(product);
  }

  @Post()
  public async createProduct(
    @Res() request: Response,
    @Body() product: ProductCommand,
  ): Promise<any> {
    const productCreated = await this.createProductUseCase.handler(product);
    return request.status(HttpStatus.CREATED).json(productCreated);
  }

  @Delete(':id')
  public async deleteProduct(
    @Res() request: Response,
    @Param('id') id: number,
  ): Promise<any> {
    const product = await this.deleteProductUseCase.handler(id);
    return request.status(HttpStatus.OK).json(product);
  }

  @Put(':id')
  public async updateProduct(
    @Res() request: Response,
    @Param('id') id: number,
    @Body() product: Product,
  ): Promise<any> {
    const productUpdated = await this.updateProductUseCase.handler(id, product);
    return request.status(HttpStatus.OK).json(productUpdated);
  }
}
