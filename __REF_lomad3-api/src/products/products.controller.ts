import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProductListResponse } from './dtos/product-list.response';
import { ProductResponse } from './dtos/product.response';
import { ProductsService } from './products.service';

type Pagination = {
  page?: number;
  limit?: number;
};

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: '제품 리스트를 가져옵니다.' })
  @ApiResponse({ type: ProductListResponse, status: 200, isArray: true })
  @Get()
  async getAllList(
    { page = 0, limit = 51 }: Pagination,
    filter?: { [key: string]: any },
  ): Promise<ProductListResponse> {
    const products = await this.productsService.findAll(
      { page, limit },
      filter,
    );

    return {
      products,
    };
  }

  @ApiOperation({ summary: '제품을 가져옵니다.' })
  @ApiResponse({ type: ProductResponse, status: 200 })
  @Get(':id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductResponse> {
    return this.productsService.findOne(id);
  }
}
