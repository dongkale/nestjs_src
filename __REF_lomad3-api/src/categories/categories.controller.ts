import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProductListResponse } from '@/products/dtos/product-list.response';

import { CategoriesService } from './categories.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: '카테고리 리스트를 가져옵니다.' })
  @ApiResponse({ type: CategoryListResponse, status: 200, isArray: true })
  @Get()
  async getAllList(): Promise<CategoryListResponse> {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: '카테고리의 제품 리스트를 가져옵니다.' })
  @ApiResponse({ type: ProductListResponse, status: 200, isArray: true })
  @Get(':id/products')
  async getProducts(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductListResponse> {
    return this.categoriesService.findProducts(id);
  }
}
