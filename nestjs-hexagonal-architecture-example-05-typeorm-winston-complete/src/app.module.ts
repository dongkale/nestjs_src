import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import DomainModule from './domain/domain.module';
import ApplicationModule from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

// @Module({})
// export default class AppModule {
//   static foorRoot(setting: any): DynamicModule {
//     return {
//       module: AppModule,
//       imports: [
//         DomainModule,
//         ApplicationModule,
//         InfrastructureModule.foorRoot(setting),
//       ],
//     };
//   }
// }

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DomainModule,
    ApplicationModule,
    InfrastructureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
