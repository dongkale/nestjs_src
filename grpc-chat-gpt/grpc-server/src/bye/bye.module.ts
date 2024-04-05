import { Module } from '@nestjs/common';
import { ByeController } from './bye.controller';
import { ByeService } from './bye.service';

@Module({
  imports: [],
  controllers: [ByeController],
  providers: [ByeService],
})
export class ByeModule {}
