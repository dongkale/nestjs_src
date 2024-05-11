import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (env: ConfigService) => ({
        type: 'postgres',
        host: env.get<string>('DB_HOST'),
        port: env.get<number>('DB_PORT'),
        username: env.get<string>('DB_USER'),
        password: env.get<string>('DB_PASSWORD'),
        database: env.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
        extra: {
          connectionLimit: 10,
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseConfig {}
