import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, TcpOptions } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.createMicroservice(AppModule, {
  //   transport: Transport.TCP,
  //   options: {
  //     host: '0.0.0.0',
  //     port: 3005,
  //   },
  // } as TcpOptions);
  // await app.listen();

  // const app = await NestFactory.createMicroservice(AppModule, {
  //   transport: Transport.TCP,
  //   options: {
  //     host: 'localhost',
  //     port: 3005,
  //   },
  // } as TcpOptions);

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: ['nats://localhost:4222'], // NATS 서버의 주소 및 포트
    },
  });

  await app.listen();
}
bootstrap();
