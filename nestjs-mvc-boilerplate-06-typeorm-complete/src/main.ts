import {
  ClassSerializerInterceptor,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { ValidationError } from 'class-validator';
import { join } from 'path';
import { AppModule } from '@/app.module';
import { winstonLogger } from '@/configs/winston-config';
import figlet from 'figlet';

async function bootstrap() {
  const appName = process.env.APP_NAME ?? 'defaultAppName';
  const appPort = process.env.PORT ?? 3000;
  const prefix = process.env.URL_PREFIX ?? '';

  console.log(
    figlet.textSync('NestJS Server', {
      font: 'Cyberlarge',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 200,
      whitespaceBreak: true,
    }),
  );

  const logger = new Logger('bootstrap');

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useLogger(winstonLogger(appName));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      forbidNonWhitelisted: true,
      validationError: { value: true, target: true },
      transform: true,
    }),
  );

  app.useStaticAssets(join(__dirname, '..', '/src/public'));
  app.setBaseViewsDir(join(__dirname, '..', '/src/books/views'));
  app.setViewEngine('ejs');

  await app.listen(appPort);

  logger.log(`Application is running on ${await app.getUrl()} 🚀`);
}
bootstrap();
