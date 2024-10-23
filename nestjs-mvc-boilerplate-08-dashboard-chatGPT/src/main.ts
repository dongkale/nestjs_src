import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'express-handlebars';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3050);
  const appName = configService.get<string>('APP_NAME', 'EMPTY');
  const nodeEnv = configService.get<string>('NODE_ENV', 'EMPTY');
  const isProduction = configService.get('NODE_ENV') === 'production';

  app.engine('.hbs', hbs.engine({ extname: '.hbs', defaultLayout: 'main' }));
  app.set('view engine', '.hbs');
  app.set('views', join(__dirname, '..', 'views'));

  app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(port);
}
bootstrap();
