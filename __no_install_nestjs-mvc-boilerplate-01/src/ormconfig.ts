import { ConnectionOptions } from 'typeorm'

export default {
  type: 'postgres',
  'host': process.env.DATABASE_HOST,
  'port': process.env.DATABASE_PORT,
  'username': process.env.DATABASE_USERNAME,
  'password': process.env.DATABASE_PASSWORD,
  'database': process.env.DATABASE_NAME,
  autoLoadEntities: true,
  synchronize: false,
  migrationsRun: false,
  logging: process.env.NODE_ENV !== 'production',
  "ssl": true,
  "extra": {
    "ssl": {
      "rejectUnauthorized": false
    }
  },
  migrations: [`dist/migrations/**/*`],
  'cache': process.env.DATABASE_ENABLE_CACHE ? { 'duration': process.env.DATABASE_CACHE_DURATION } : false,
  cli: {
    migrationsDir: `src/migrations`
  },
  // [path for app, path for migrations from root of server package]
  entities: ['modules/**/entities/*.entity.ts', 'dist/modules/**/entities/*.entity.js']
  // subscribers: ['{modules,dist/modules}/**/subscribers/*.subscriber{.ts,.js}'],
} as unknown as ConnectionOptions
