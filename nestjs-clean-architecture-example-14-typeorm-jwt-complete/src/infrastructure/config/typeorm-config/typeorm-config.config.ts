import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

switch (process.env.NODE_ENV) {
    case 'debug':
        // dotenv.config({ path: './env/debug.env' });
        dotenv.config({ path: './env' });
        break;
    case 'development':
        // dotenv.config({ path: './env/development.env' });
        dotenv.config({ path: './env' });
        break;
    case 'production':
        // dotenv.config({ path: './env/production.env' });
        dotenv.config({ path: './env' });
        break;
    default:
        throw new Error('No environment specified');
}

export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    // entities: [__dirname + '/../../**/*.entity.{js,ts}'],
    // synchronize: process.env.NODE_ENV !== 'production',
    // useUnifiedTopology: true,
    autoLoadEntities: true,
    namingStrategy: new SnakeNamingStrategy(),
};
