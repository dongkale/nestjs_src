// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TodoController } from '@/interface/controllers/todo.controller';
import { TodoService } from '@/application/services/todo.service';
// import { TypeOrmTodoModule } from '@/infrastructure/adapters/persistence/typeorm/typeorm.module';
import { TodoModule } from '@/infrastructure/toto.module';
import { getTypeOrmConfig } from '@/config/database.config';

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
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
