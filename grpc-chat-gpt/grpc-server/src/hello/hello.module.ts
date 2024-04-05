import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HELLO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          //   url: 'localhost:5001',
          package: 'hello',
          protoPath: '../proto/hello.proto',
        },
      },
    ]),
  ],
  controllers: [HelloController],
})
export class HelloModule {}
