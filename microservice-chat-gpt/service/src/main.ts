import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  Transport,
  TcpOptions,
  MicroserviceOptions,
} from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.createMicroservice(AppModule, {
  //   transport: Transport.TCP,
  //   options: {
  //     host: '0.0.0.0',
  //     port: 3010,
  //   },
  // } as TcpOptions);
  // await app.listen();
  // const app = await NestFactory.createMicroservice(AppModule, {
  //   transport: Transport.TCP,
  //   options: {
  //     host: 'localhost',
  //     port: 3005,
  //     retryAttempts: 5,
  //     retryDelay: 3000
  //   },
  // } as TcpOptions);
  // const app = await NestFactory.createMicroservice(AppModule, {
  //   transport: Transport.NATS,
  //   options: {
  //     servers: [
  //       'nats://localhost:14222',
  //       'nats://localhost:24222',
  //       'nats://localhost:34222',
  //     ], // NATS 서버의 주소 및 포트
  //   },
  // });
  // await app.listen();

  const app = await NestFactory.create(AppModule);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3010,
      retryAttempts: 5,
      retryDelay: 3000,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: [
        'nats://localhost:14222',
        'nats://localhost:24222',
        'nats://localhost:34222',
      ], // NATS 서버의 주소 및 포트
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
  // await app.listen(3000, () => {
  //   console.log(`HTTP Server listening at ${3000}`);
  // });

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
