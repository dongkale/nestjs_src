import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as figlet from 'figlet';
import * as dotenv from 'dotenv';

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

  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT ?? 3000);

  console.log('main', `Application is running on ${await app.getUrl()} 🚀`);
}
bootstrap();
