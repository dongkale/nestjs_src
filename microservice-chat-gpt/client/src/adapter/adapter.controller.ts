import { Controller, Get, Param } from '@nestjs/common';
import { AdapterService } from './adapter.service';
import { EventPattern, Transport } from '@nestjs/microservices';

@Controller('adapter')
export class AdapterController {
  constructor(private readonly adapterService: AdapterService) {}

  @Get('tcp/:message')
  async getHelloTcp(@Param('message') message: string): Promise<string> {
    return this.adapterService.getHelloTCP(message);
  }

  @Get('nats/:message')
  async getHelloNats(@Param('message') message: string): Promise<string> {
    return this.adapterService.getHelloNats(message);
  }

  @Get('nats-event/:message')
  async getHelloNatsEvent(@Param('message') message: string): Promise<string> {
    return this.adapterService.getHelloNatsEvent(message);
  }

  @EventPattern({ cmd: 'Event_hello_NATS' }, Transport.NATS)
  async handleUserCreated(data: Record<string, unknown>) {
    // business logic

    console.log(`[Event_hello_NATS] ${JSON.stringify(data)}`);
  }
}
