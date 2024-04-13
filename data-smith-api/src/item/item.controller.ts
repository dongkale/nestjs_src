/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Logger } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('item')
export class ItemController {
  private readonly logger = new Logger(ItemController.name);

  constructor(private itemService: ItemService) {}

  @ApiOperation({
    summary: '아이템 리스트 요청 API',
    description: '아이템 리스트 요청한다.',
  })
  @ApiCreatedResponse({ description: '유저를 생성한다.', type: Item })
  @Get()
  findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }
}
