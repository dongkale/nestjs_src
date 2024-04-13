import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/item/item.entity';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory(configService: ConfigService) {
        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          // entities: [Item],
          autoLoadEntities: true,
          synchronize:
            configService.get<string>('NODE_ENV') == 'development'
              ? true
              : false, // synchronize: true는 운영에서는 사용하지 마세요
          logging:
            configService.get<string>('NODE_ENV') == 'development'
              ? true
              : false, // logging: true는 운영에서는 사용하지 마세요. 쿼리가 많아지면 성능에 영향을 줄 수 있습니다.
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
