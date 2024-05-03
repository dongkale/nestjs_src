import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
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

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const appName = configService.get<string>('APP_NAME', 'EMPTY');
  const nodeEnv = configService.get<string>('NODE_ENV', 'EMPTY');

  await app.listen(port, function () {
    console.log(
      `[${appName}][${nodeEnv}] application is listening on port ${port}...`,
    );
  });
}
bootstrap();
