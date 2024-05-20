import { APP_GUARD } from '@nestjs/core';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';

import { AtGuard } from './common/guards/at.guard';
import { AuthModule } from './auth/auth.module';
import { LoggingModule } from './utils';
import { RolesModule } from './roles/role.module';
import { PermissionsModule } from './permissions';

import helmet from 'helmet';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    CommonModule,
    LoggingModule,
    AuthModule,
    UserModule,
    RolesModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    AppService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        helmet({
          crossOriginEmbedderPolicy: false,
          contentSecurityPolicy: {
            directives: {
              defaultSrc: [`'self'`],
              styleSrc: [`'self'`, `'unsafe-inline'`],
              imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
              scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
            },
          },
        }),
      )
      .forRoutes('*');
  }
}
