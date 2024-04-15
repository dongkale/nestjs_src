import { Module } from '@nestjs/common';

import { CommonModule } from '@/common/common.module';

import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';

@Module({
  imports: [CommonModule],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
