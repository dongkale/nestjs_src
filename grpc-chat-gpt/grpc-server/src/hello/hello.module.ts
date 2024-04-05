import { HelloService } from './hello.service';
import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client.options';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HELLO_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [HelloController],
  providers: [HelloService],
})
export class HelloModule {}
