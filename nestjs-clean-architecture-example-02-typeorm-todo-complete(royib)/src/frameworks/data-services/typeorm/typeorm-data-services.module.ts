import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './model';
import { IDataServices } from '@/core';
import { TypeOrmDataServices } from '@/frameworks/data-services/typeorm/typeorm-data-services.service';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DATA_BASE_CONFIGURATION } from '@/configuration';
// import dotenv from 'dotenv';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: process.env.DB_HOST,
      // port: 3306, // parseInt(process.env.DB_PORT), // Convert string to number
      // database: process.env.DB_NAME,
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      host: DATA_BASE_CONFIGURATION.HOST,
      port: +DATA_BASE_CONFIGURATION.PORT,
      username: DATA_BASE_CONFIGURATION.DB_USERNAME,
      password: DATA_BASE_CONFIGURATION.DB_PASSWORD,
      database: DATA_BASE_CONFIGURATION.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     type: 'mysql',
    //     host: configService.get<string>('DB_HOST'),
    //     port: configService.get<number>('DB_PORT'),
    //     username: configService.get<string>('DB_USERNAME'),
    //     password: configService.get<string>('DB_PASSWORD'),
    //     database: configService.get<string>('DB_NAME'),
    //     autoLoadEntities: true,
    //     synchronize: false,
    //     namingStrategy: new SnakeNamingStrategy(),
    //   }),
    //   inject: [ConfigService],
    // }),
    TypeOrmModule.forFeature([Todo]),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: TypeOrmDataServices,
    },
  ],
  exports: [IDataServices],
})
export class TypeOrmDataServicesModule {}
