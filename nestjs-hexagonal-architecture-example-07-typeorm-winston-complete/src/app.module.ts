import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from '@/member/member.module';
import { getTypeOrmConfig } from '@/configs/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mysql',
    //     host: configService.get<string>('DATABASE_HOST'),
    //     port: configService.get<number>('DATABASE_PORT'),
    //     username: configService.get<string>('DATABASE_USERNAME'),
    //     password: configService.get<string>('DATABASE_PASSWORD'),
    //     database: configService.get<string>('DATABASE_NAME'),
    //     autoLoadEntities: true,
    //     synchronize: false,
    //     namingStrategy: new SnakeNamingStrategy(),
    //   }),
    //   inject: [ConfigService],
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    MemberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
