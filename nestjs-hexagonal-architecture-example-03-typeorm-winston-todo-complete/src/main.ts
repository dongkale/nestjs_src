import { NestFactory, Reflector } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { AppModule } from '@/app.module';
import { ValidationError } from 'class-validator';
import { CustomValidationError } from '@/commons/exception/custom-validation-error';
import { HttpExceptionFilter } from '@/commons/exception/http-exception.filter';
import * as figlet from 'figlet';
import * as dotenv from 'dotenv';

import { winstonLogger } from '@/config/winston.config';

dotenv.config();

async function bootstrap() {
  const appName = process.env.APP_NAME ?? 'defaultAppName';
  const appPort = process.env.PORT ?? 3000;

  console.log(
    figlet.textSync('NestJS Server', {
      font: 'Cyberlarge',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 200,
      whitespaceBreak: true,
    }),
  );

  const logger = new Logger('Main');

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
