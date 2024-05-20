import { Options } from '@mikro-orm/postgresql';

const config: Options = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 3306,
  user: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || '123',
  dbName: process.env.DATABASE_NAME || 'postgres',
  schema: process.env.DATABASE_SCHEMA || 'public',
  // entitiesTs: ['./src/**/*.entity.ts'],
  // entities: ['./dist/**/*.entity.js'],
  baseDir: __dirname + '/..',
  // migrations: {
  //   tableName: 'migrations',
  //   path: './src/database/migrations',
  //   transactional: true,
  //   disableForeignKeys: true,
  //   allOrNothing: true,
  //   dropTables: true,
  // },
  // seeder: {
  //   path: './src/database/seeders',
  // },
};

export default config;
