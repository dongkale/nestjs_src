import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonLogger } from './common/logger/winston.util';
// import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';
import 'winston-daily-rotate-file';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { setupSwagger } from './common/swagger/setup-swagger';
// import { EntityNotFoundExceptionFilter } from './common/filters/entity-not-found-exception.filter';
// import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { CustomExceptionFilter } from './common/filters/custom-exception.filter';

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
  const isProduction = configService.get('NODE_ENV') === 'production';

  // Cross-Origin Resource Sharing
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    optionsSuccessStatus: 200,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: isProduction,
    }),
  );

  setupSwagger(app, prefix);
  app.setGlobalPrefix(prefix);

  // await app.enableVersioning({
  //   type: VersioningType.URI,
  //   defaultVersion: '1',
  // });

  await app.useGlobalFilters(new CustomExceptionFilter());

  await app.listen(port);

  console.log(
    `[${appName}][${nodeEnv}] Application is running on: ${await app.getUrl()}`,
  );
}
bootstrap();
