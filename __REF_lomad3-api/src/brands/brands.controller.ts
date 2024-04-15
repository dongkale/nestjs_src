import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProductListResponse } from '@/products/dtos/product-list.response';

import { BrandsService } from './brands.service';
import { BrandListResponse } from './dtos/brand-list.response';
import { BrandResponse } from './dtos/brand.response';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @ApiOperation({ summary: '브랜드 리스트를 가져옵니다.' })
  @ApiResponse({ type: BrandListResponse, status: 200, isArray: true })
  @Get()
  async getAllList(): Promise<BrandListResponse> {
    return this.brandsService.findAll();
  }

  @ApiOperation({ summary: '브랜드를 가져옵니다.' })
  @ApiResponse({ type: BrandResponse, status: 200 })
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<BrandResponse> {
    return this.brandsService.findOne(id);
  }

  @ApiOperation({ summary: '브랜드의 제품 리스트를 가져옵니다.' })
  @ApiResponse({ type: ProductListResponse, status: 200, isArray: true })
  @Get(':id/products')
  async getProducts(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductListResponse> {
    return this.brandsService.findProducts(id);
  }
}
