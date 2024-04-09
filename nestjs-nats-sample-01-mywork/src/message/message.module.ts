import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
