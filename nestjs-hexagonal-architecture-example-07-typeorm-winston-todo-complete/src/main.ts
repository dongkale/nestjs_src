import { NestFactory, Reflector } from '@nestjs/core';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  Logger,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { AppModule } from './app.module';
import * as figlet from 'figlet';
import * as dotenv from 'dotenv';

import { winstonLogger } from '@/configs/winston.config';
import { CustomValidationError } from '@/libs/exception/custom-validation-error';
import { HttpExceptionFilter } from '@/libs/exception/http-exception.filter';

dotenv.config();

async function bootstrap() {
  const appName = process.env.APP_NAME ?? 'defaultAppName';
  const appPort = process.env.PORT ?? 3000;

  console.log(
    figlet.textSync(appName + ' Server', {
      font: 'Cyberlarge',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 200,
      whitespaceBreak: true,
    }),
  );

  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  app.useLogger(winstonLogger(appName));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      forbidNonWhitelisted: true,
      validationError: { value: true, target: true },
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((e) => new CustomValidationError(e)),
        );
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(appPort);

  logger.log(`Application is running on ${await app.getUrl()} 🚀`);
}
bootstrap();
