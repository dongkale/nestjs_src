import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from '@/app.module';
import * as figlet from 'figlet';
import { winstonLogger } from '@/configs/winston.config';
import { setupSwagger } from '@/configs//swagger.config';
import { HttpExceptionFilter } from './commons/filters/http-exception.filter';

dotenv.config();

async function bootstrap() {
  const appName = process.env.APP_NAME ?? 'defaultAppName';
  const appPort = process.env.PORT ?? 3000;
  const prefix = process.env.URL_PREFIX ?? '';

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
  setupSwagger(app, prefix);

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(appPort);

  logger.log(`Application is running on ${await app.getUrl()} 🚀`);
}
bootstrap();
