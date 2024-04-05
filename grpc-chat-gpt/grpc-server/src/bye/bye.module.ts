import { Module } from '@nestjs/common';
import { ByeController } from './bye.controller';
import { ByeService } from './bye.service';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client.options';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BYE_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [ByeController],
  providers: [ByeService],
})
export class ByeModule {}
