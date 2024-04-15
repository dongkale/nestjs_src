import { Module } from '@nestjs/common';

import { CommonModule } from '@/common/common.module';

import { MyController } from './my.controller';
import { MyService } from './my.service';

@Module({
  imports: [CommonModule],
  controllers: [MyController],
  providers: [MyService],
})
export class MyModule {}
