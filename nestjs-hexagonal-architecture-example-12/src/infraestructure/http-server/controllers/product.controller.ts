import { Body, Controller, Inject, Post, UseFilters } from '@nestjs/common';
import { ProductCreatorFilter } from '../exception-filters/product-exception.filter';
import { ProductApplication } from 'src/core/application/ProductApplication';
import { CreateProductRequest } from '../model/create-product.request';
import { AppResponse } from '../model/app.response';

@Controller('/product')
@UseFilters(ProductCreatorFilter)
export class ProductController {
  constructor(
    @Inject(PRODUCT_APPLICATION) private application: ProductApplication,
  ) {}

  @Post()
  async createProduct(
    @Body() request: CreateProductRequest,
  ): Promise<AppResponse> {
    AppLogger.log(`(POST) Create product`, request);
    const productId = await this.application.createProduct(request);

    return {
      status: 201,
      message: `Product(id=${productId}) created OK`,
    };
  }
}
