import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as figlet from 'figlet';
import * as ip from 'ip';
import * as os from 'os';

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

  // console.log(os.cpus());
  // console.log(os.totalmem());
  // console.log(os.freemem());

  console.log(`cpu count: ${os.cpus().length}`);
  console.log(`hostname: ${os.hostname()}`);
  console.log(`node version: ${process.version}`);
  console.log(`app name: ${process.env.APP_NAME}`);
  console.log(`node env: ${process.env.NODE_ENV || 'local'}`);
  console.log(`host platform: ${process.platform}`);
  console.log(`host architecture: ${process.arch}`);

  console.log(`api ip: ${ip.address()}, port: ${process.env.PORT}`);
  // console.log(`http://${ip.address()}:${port}/api-docs`);

  const app = await NestFactory.create(ApplicationModule);
  app.listen(3000, () => console.log('Application is listening on port 3000.'));
}
bootstrap();
