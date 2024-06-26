import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as figlet from 'figlet';
import * as dotenv from 'dotenv';

import { winstonLogger } from '@/configs/winston.config';

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

  await app.listen(appPort);

  logger.log(`Application is running on ${await app.getUrl()} 🚀`);
}
bootstrap();
