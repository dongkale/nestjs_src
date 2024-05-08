import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV === 'local') {
  dotenv.config({ path: '.env' });
}

const config: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_PORT,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + './../../**/*.entity{.ts,.js}'],
  synchronize: false,
  // schema: process.env.DATABASE_SCHEMA,
  // migrationsRun: true,
  // migrationsTableName: 'migration_todo',
  // migrations: ['database/migrations/**/*{.ts,.js}'],
  // cli: {
  //   migrationsDir: 'database/migrations',
  // },
  // ssl: {
  //   rejectUnauthorized: false,
  // },
};

console.log(config);

export default config;
