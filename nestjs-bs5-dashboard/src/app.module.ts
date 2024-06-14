import {
  Global,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { join } from 'path';
import { Appv2Controller } from './appv2/appv2.controller';
import envConfig from './common/config/env.config';
import { RequestIdMiddleware } from './common/middlewares/request-id/request-id.middleware';
import systemInfoInterceptor from './common/middlewares/request-id/system-info.interceptor';
import { AppService } from './common/modules/global/app.service';
import { GlobalModule } from './common/modules/global/global.module';
import { PagesModule } from './modules/pages/pages.module';

// config
const configModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [envConfig],
});

@Global()
@Module({
  imports: [configModule, GlobalModule, PagesModule],
  controllers: [Appv2Controller],
  providers: [AppService],
})
export class AppModule {
  /**
   * Request ID Middlewares
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestIdMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

export const getAppInstance = async () => {
  const _app = await NestFactory.create<NestExpressApplication>(AppModule);

  /**
   * Allow NestJS Dependency Injector
   * to be used for class-validator
   */
  useContainer(_app.select(AppModule), { fallbackOnErrors: true });

  /**
   * Attach System Data
   * on response headers
   */
  _app.use(systemInfoInterceptor);

  /**
   * Enable CORS
   */
  _app.enableCors();

  _app.useStaticAssets(join(__dirname, '..', 'public'));
  _app.setBaseViewsDir(join(__dirname, '..', 'views'));
  _app.setViewEngine('ejs');

  return _app;
};
