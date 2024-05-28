import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';

dotenv.config();
export const config: TypeOrmModuleOptions = {
  // name: "default",
  timezone: 'Asia/Seoul',
  type: 'mysql',
  // docker-compose로 부터 환경변수를 받아서 사용 
  host: process.env.DB_HOST,
  port: 3306,
  // username: 'root',
  // password: 'root',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'min-research',
  synchronize: true,
  autoLoadEntities: true,
  charset: 'utf8mb4',
  logging: process.env.NODE_ENV !== 'production' ? true : false,
  keepConnectionAlive: true,
};
