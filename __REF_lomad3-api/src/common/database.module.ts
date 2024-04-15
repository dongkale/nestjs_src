import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { KnexModule } from 'nest-knexjs';

import { stringToSnakeCase, camelCase } from '@/libs/utils';

import { DatabaseService } from './database.service';

@Module({
  imports: [
    KnexModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        config: {
          client: 'mysql',
          useNullAsDefault: true,
          connection: {
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            user: configService.get<string>('DB_USERNAME'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_DATABASE'),
            timezone: 'Asia/Seoul',
            dateStrings: 'date',
          },
          pool: {
            min: 2,
            max: 10,
          },
          wrapIdentifier: (value, origImpl) =>
            origImpl(stringToSnakeCase(value)),
          postProcessResponse: result => (result ? camelCase(result) : result),
        },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
