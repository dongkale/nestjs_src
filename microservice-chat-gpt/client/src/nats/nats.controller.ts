import { Controller, Get, Param, Logger } from '@nestjs/common';
import { NatsService } from './nats.service';

@Controller('nats')
export class NatsController {
  private readonly logger = new Logger(NatsController.name);

  constructor(private readonly natsService: NatsService) {
    this.natsService.subscribe('rev-message', (err, msg) => {
      this.logger.log(`[Reserved] Recved a message: ${msg.data}`);
    });

    this.logger.log(`[Reserved] Subscribed message to rev-message`);
  }

  @Get('rev-publish/:message')
  async natsRevPublish(@Param('message') message: string): Promise<string> {
    this.natsService.publish('rev-message', message);
    this.logger.log(`[Reserved] Published message to ${message}`);

    return 'Published to ' + message;
  }

  @Get('publish/:message')
  async natsPublish(@Param('message') message: string): Promise<string> {
    this.natsService.publish('nats-publish', message);
    this.logger.log(`Published message to ${message}`);

    return 'Published to ' + message;
  }

  @Get('subscribe')
  async natsSubscribe(): Promise<string> {
    this.natsService.subscribe('nats-publish', (err, msg) => {
      this.logger.log(`Recved a message: ${msg.data}`);
    });

    return 'Subscribed from subscribe';
  }
}
