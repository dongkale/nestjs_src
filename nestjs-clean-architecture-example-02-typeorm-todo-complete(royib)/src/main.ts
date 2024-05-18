import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import * as figlet from 'figlet';
import * as dotenv from 'dotenv';

import { winstonLogger as WinstonLogger } from '@/frameworks/log-service/winston-logger.service';

async function bootstrap() {
  dotenv.config();

  console.log(
    figlet.textSync('NestJS Server', {
      font: 'Cyberlarge',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      whitespaceBreak: true,
    })
  );

  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonLogger('NESTJS'),
  });

  await app.listen(process.env.PORT ?? 3000);

  console.log('main', `Application is running on ${await app.getUrl()} 🚀`);
}
bootstrap();
