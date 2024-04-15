import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CancelMyOrderRequest } from './dtos/cancel-my-order.request';
import { CreateMyCartRequest } from './dtos/create-my-cart.request';
import { MyCartListResponse } from './dtos/my-cart-list.response';
import { MyOrderCreateRequest } from './dtos/my-order-create.request';
import { MyOrderDetailResponse } from './dtos/my-order-detail.response';
import { MyOrderResponse } from './dtos/my-order.response';
import { MyDto } from './dtos/my.dto';
import { MyResponse } from './dtos/my.response';
import { UpdateMyOrderRequest } from './dtos/update-my-order.request';
import { UpdateMyRequest } from './dtos/update-my.request';
import { MyService } from './my.service';

@ApiTags('My')
@Controller('my')
export class MyController {
  constructor(private readonly myService: MyService) {}

  @ApiOperation({ summary: '유저 정보를 가져옵니다.' })
  @ApiResponse({ type: MyResponse, status: 200 })
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<MyResponse> {
    return this.myService.findOne(id);
  }

  @ApiOperation({ summary: '유저를 생성합니다.' })
  @Post()
  async create(@Body() body: MyDto) {
    return this.myService.create(body);
  }

  @ApiOperation({ summary: '유저를 수정합니다.' })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateMyRequest,
  ) {
    return this.myService.update(id, body);
  }

  @ApiOperation({ summary: '유저의 주문 내역을 가져옵니다.' })
  @ApiResponse({ type: MyOrderResponse, status: 200, isArray: true })
  @Get(':id/orders')
  async getOrders(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MyOrderResponse> {
    return this.myService.findOrders(id);
  }

  @ApiOperation({ summary: '유저의 주문 상세 내역을 가져옵니다.' })
  @ApiResponse({ type: MyOrderDetailResponse, status: 200 })
  @Get(':id/orders/:orderId')
  async getOrder(
    @Param('id', ParseIntPipe) id: number,
    @Param('orderId', ParseIntPipe) orderId: number,
  ): Promise<MyOrderDetailResponse> {
    return this.myService.findOrder(id, orderId);
  }

  @ApiOperation({ summary: '유저의 주문을 생성합니다.' })
  @Post(':id/orders')
  async createOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: MyOrderCreateRequest,
  ) {
    return this.myService.createOrder(id, body);
  }

  @ApiOperation({ summary: '유저의 주문을 수정합니다.' })
  @Patch(':id/orders/:orderId')
  async updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() body: UpdateMyOrderRequest,
  ) {
    return this.myService.updateOrder(id, orderId, body);
  }

  @ApiOperation({ summary: '유저의 주문을 취소합니다.' })
  @Post(':id/orders/:orderId/cancel')
  async cancelOrder(
    @Param('id', ParseIntPipe) id: number,
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() body: CancelMyOrderRequest,
  ) {
    return this.myService.cancelOrder(id, orderId, body);
  }

  @ApiOperation({ summary: '유저의 장바구니 내역을 가져옵니다.' })
  @ApiResponse({ type: MyCartListResponse, status: 200, isArray: true })
  @Get(':id/cart')
  async getCart(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MyCartResponse> {
    return this.myService.findCart(id);
  }

  @ApiOperation({ summary: '유저의 장바구니에 제품을 추가합니다.' })
  @Post(':id/cart')
  async createCart(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateMyCartRequest,
  ) {
    return this.myService.createCart(id, body);
  }

  @ApiOperation({ summary: '유저의 장바구니 제품을 삭제합니다.' })
  @Delete(':id/cart/:cartId')
  async deleteCart(
    @Param('id', ParseIntPipe) id: number,
    @Param('cartId', ParseIntPipe) cartId: number,
  ) {
    return this.myService.deleteCart(id, cartId);
  }
}
