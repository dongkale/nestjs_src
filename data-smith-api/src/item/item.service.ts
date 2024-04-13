import { Injectable, Logger } from '@nestjs/common';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemService {
  private readonly logger = new Logger(ItemService.name);

  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    try {
      const items = await this.itemRepository.find();

      for (const item of items) {
        const parseData = JSON.parse(item.dataJson);
        this.logger.debug(parseData);
        this.logger.debug(
          `Item: id: ${item.id}, name: ${item.name}, description: ${item.description}, data_json: ${JSON.stringify(item.dataJson)}, created_at: ${item.createdAt}, updated_at: ${item.updatedAt}`,
        );
      }

      /*
      items.forEach((item) => {
        const parseData = JSON.parse(item.dataJson);
        this.logger.debug(parseData);
        this.logger.debug(
          `Item: id: ${item.id}, name: ${item.name}, description: ${item.description}, data_json: ${JSON.stringify(item.dataJson)}, created_at: ${item.createdAt}, updated_at: ${item.updatedAt}`,
        );
      });
      */

      // this.logger.debug(items);

      return items;
    } catch (error) {
      this.logger.debug(error);
      throw error;
    }
  }
}
