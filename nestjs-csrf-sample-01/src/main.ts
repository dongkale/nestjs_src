import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { ThrottlerGuard } from '@nestjs/throttler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(csurf());

  app.use(cookieParser());
  app.use(csurf({ cookie: { sameSite: true } }));

  app.use((req: any, res: any, next: any) => {
    const token = req.csrfToken();
    res.cookie('XSRF-TOKEN', token);
    res.locals.csrfToken = token;

    next();
  });

  // app.useGlobalGuards(new ThrottlerGuard(app.get(ThrottlerService)));

  await app.listen(3000);
}
bootstrap();
