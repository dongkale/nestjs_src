import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

import * as session from 'express-session';
import flash = require('connect-flash');
import * as passport from 'passport';
import * as csurf from 'csurf';
import * as bodyParser from 'body-parser';
import { FlashMessageCsrfInterceptor } from './common/interceptors/flash_message_csrf.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('pug');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove non whitelisted keys
      forbidNonWhitelisted: false, // only keys that are defined in DTO will be allowed or reject request completely
      transform: true, // tranform Body, Params of a request to an instance of our DTO class rather than plain JS object
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  // app.useGlobalInterceptors(FlashMessageCsrfInterceptor)

  app.use(
    session({
      secret: process.env.APP_SECRET,
      resave: false,
      saveUninitialized: false
    })
  )

  // for form CSRF
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(csurf());

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  await app.listen(3000);
}
bootstrap();
