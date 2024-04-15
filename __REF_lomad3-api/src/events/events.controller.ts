import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProductListResponse } from '@/products/dtos/product-list.response';

import { EventListResponse } from './dtos/event-list.response';
import { EventsService } from './events.service';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiOperation({ summary: '이벤트 리스트를 가져옵니다.' })
  @ApiResponse({ type: EventListResponse, status: 200, isArray: true })
  @Get()
  async getAll(): Promise<EventListResponse> {
    return this.eventsService.findAll();
  }

  @ApiOperation({ summary: '이벤트의 제품 리스트를 가져옵니다.' })
  @ApiResponse({ type: ProductListResponse, status: 200, isArray: true })
  @Get(':id/products')
  async getProducts(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductListResponse> {
    return this.eventsService.findProducts(id);
  }
}
