import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import * as figlet from 'figlet';
import * as dotenv from 'dotenv';

import { winstonLogger } from '@/frameworks/log-service/winston-logger.service';

dotenv.config();

async function bootstrap() {
  console.log(
    figlet.textSync('NestJS Server', {
      font: 'Cyberlarge',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      whitespaceBreak: true,
    })
  );

  const app = await NestFactory.create(AppModule);

  app.useLogger(winstonLogger(process.env.APP_NAME ?? 'defaultAppName'));

  await app.listen(process.env.PORT ?? 3000);

  console.log('main', `Application is running on ${await app.getUrl()} 🚀`);
}
bootstrap();
