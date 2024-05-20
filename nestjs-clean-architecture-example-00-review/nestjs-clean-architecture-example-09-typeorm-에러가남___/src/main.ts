import {
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationPipe, // Add this line
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { AppModule } from './infrastructure/application/app.module';
import morgan from 'morgan';
import { ResponseFormatter } from './infrastructure/application/common/interceptor/success-formatter.interceptor';
import { ErrorFormatter } from './infrastructure/application/common/interceptor/error-formatter.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const appLogger = new Logger('NestApplication');
  const reqLogger = new Logger('IncomingRequest');

  const port = configService.get<number>('PORT');

  app.enableCors({
    origin: '*',
  });

  app.useGlobalInterceptors(new ResponseFormatter());
  app.useGlobalInterceptors(new ErrorFormatter());

  app.use(
    morgan('combined', {
      stream: {
        write: (message: any) => reqLogger.verbose(message),
      },
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => {
          const { property, constraints } = error;

          const keys = Object.keys(constraints);

          const msgs: string[] = [];

          keys.forEach((key) => {
            msgs.push(`${constraints[key]}`);
          });

          return {
            property,
            errors: msgs,
          };
        });

        throw new UnprocessableEntityException(messages);
      },
    }),
  );

  await app.listen(port);
  appLogger.log(`Application is running on port ${port}`);
}
bootstrap();
