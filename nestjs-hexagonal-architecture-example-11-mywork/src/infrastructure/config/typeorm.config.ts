// src/infrastructure/config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '@/infrastructure/adapters/persistence/entity/user.entity';

// configService 활용
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'test',
  entities: [UserEntity],
  synchronize: true,
};
