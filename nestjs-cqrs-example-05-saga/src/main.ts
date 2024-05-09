import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as figlet from 'figlet';

async function bootstrap() {
  console.log(
    figlet.textSync('NestJS Server', {
      font: 'Cyberlarge', //Ghost , Standard , Graffiti , Dancing Font , Slant , Pagga
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 200,
      whitespaceBreak: true,
    }),
  );

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
