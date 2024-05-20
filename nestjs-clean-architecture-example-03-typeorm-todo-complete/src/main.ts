import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from '@/app.module';
import { AllExceptionFilter } from '@/infrastructure/common/filter/exception.filter';
import { LoggingInterceptor } from '@/infrastructure/common/interceptors/logger.interceptor';
import { ResponseFormat, ResponseInterceptor } from '@/infrastructure/common/interceptors/response.interceptor';
// import { LoggerService } from '@/infrastructure/logger/logger.service';
import * as figlet from 'figlet';
import * as dotenv from 'dotenv';

//import { winstonLogger as WinstonLogger } from '@/infrastructure/logger/winston-logger.service';
import { winstonLogger } from '@/infrastructure/logger/winston-logger.service';

dotenv.config();

async function bootstrap() {
  console.log(
    figlet.textSync('NestJS Server', {
      font: 'Cyberlarge',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 200,
      whitespaceBreak: true,
    }),
  );

  const env = process.env.NODE_ENV;
  const app = await NestFactory.create(AppModule);
  // {
  //   cors: true,
  //   logger: WinstonLoggerService('NESTJS'),
  // });

  app.useLogger(winstonLogger(process.env.APP_NAME));
  // app.useLogger(app.get(WinstonLoggerService));

  app.use(cookieParser());

  // Filter
  // app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  app.useGlobalFilters(new AllExceptionFilter());

  // pipes
  app.useGlobalPipes(new ValidationPipe());

  // interceptors
  // app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ResponseInterceptor());

  // base routing
  app.setGlobalPrefix('api_v1');

  // swagger config
  if (env !== 'production') {
    const config = new DocumentBuilder()
      // .addBearerAuth()
      .setTitle('Clean Architecture Nestjs')
      .setDescription('Example with todo list')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });
    SwaggerModule.setup('api-docs', app, document);
  }

  await app.listen(3000);
}
bootstrap();
