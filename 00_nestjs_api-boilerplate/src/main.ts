import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonLogger } from './common/logger/winston.util';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';
import 'winston-daily-rotate-file';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './common/swagger/setup-swagger';

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: winstonLogger('NESTJS-API-BOILERPLATE'),
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const appName = configService.get<string>('APP_NAME', 'EMPTY');
  const nodeEnv = configService.get<string>('NODE_ENV', 'EMPTY');
  const prefix = configService.get('URL_PREFIX', '');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  setupSwagger(app, prefix);
  app.setGlobalPrefix(prefix);

  await app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port);

  console.log(
    `[${appName}][${nodeEnv}] Application is running on: ${await app.getUrl()}`,
  );
}
bootstrap();