import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.createMicroservice(AppModule, {
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'hello',
  //     protoPath: './proto/hello.proto',
  //   },
  // });
  // await app.listen(5001);

  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: ['hello', 'bye'],
      protoPath: ['../proto/hello.proto', '../proto/bye.proto'],
    },
  });

  await app.startAllMicroservices();
  await app.listen(5001);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
