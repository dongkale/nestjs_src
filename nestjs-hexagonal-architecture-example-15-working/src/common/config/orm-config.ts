import { BoardOrmEntity } from './../../board/adaptor/out-persistence/board.orm-entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as env from 'dotenv';
import { error } from 'console';

env.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  namingStrategy: new SnakeNamingStrategy(),
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3000'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [BoardOrmEntity],
  synchronize: false,
  logging: true,
  autoLoadEntities: true,
};
