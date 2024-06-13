import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TodoOrmEntity } from '@/todo/adaptor/out-persistence/todo.typeorm-entity';
import * as env from 'dotenv';

env.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  namingStrategy: new SnakeNamingStrategy(),
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3000'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [TodoOrmEntity],
  synchronize: false,
  autoLoadEntities: true,
};
