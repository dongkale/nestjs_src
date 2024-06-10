import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountPersistenceModule } from '@/modules/account-persistence/account-persistence.module';
import { AccountWebModule } from '@/modules/account-web/account-web.module';
import { getTypeOrmConfig } from '@/config/database.config';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: path.join(__dirname, '..', 'data', 'data.sqlite'),
    //   logging: true,
    //   autoLoadEntities: true,
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    AccountPersistenceModule,
    AccountWebModule,
  ],
})
export class AppModule {}
