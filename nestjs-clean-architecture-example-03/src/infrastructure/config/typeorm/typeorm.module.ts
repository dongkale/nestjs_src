import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigModule } from '@/infrastructure/config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '@/infrastructure/config/environment-config/environment-config.service';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
export const getTypeOrmModuleOptions = (config: EnvironmentConfigService): TypeOrmModuleOptions =>
  ({
    type: 'mysql',
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    database: config.getDatabaseName(),
    namingStrategy: new SnakeNamingStrategy(),
    // entities: [__dirname + './../../**/*.entity{.ts,.js}'],
    // synchronize: false,
    // schema: process.env.DATABASE_SCHEMA,
    // migrationsRun: true,
    // migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    // cli: {
    //   migrationsDir: 'src/migrations',
    // },
    // ssl: {
    //   rejectUnauthorized: false,
    // },
  }) as TypeOrmModuleOptions;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
