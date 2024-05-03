import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import os from 'os';
import * as ip from 'ip';
import * as figlet from 'figlet';

async function bootstrap() {
  // figlet.text(
  //   'TEST!!',
  //   {
  //     font: 'Graffiti', //Ghost , Standard , Graffiti , Dancing Font , Slant , Pagga
  //     horizontalLayout: 'full',
  //     verticalLayout: 'default',
  //     // width: 500,
  //     whitespaceBreak: true,
  //   },
  //   function (err, data) {
  //     if (err) {
  //       console.log('Something went wrong...');
  //       console.dir(err);
  //       return;
  //     }
  //     console.log(data);
  //   },
  // );

  console.log(
    figlet.textSync('NestJS Server', {
      font: 'Standard', //Ghost , Standard , Graffiti , Dancing Font , Slant , Pagga
      horizontalLayout: 'fitted',
      verticalLayout: 'default',
      width: 200,
      whitespaceBreak: true,
    }),
  );

  // console.log(figlet.fontsSync());

  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}
bootstrap();
