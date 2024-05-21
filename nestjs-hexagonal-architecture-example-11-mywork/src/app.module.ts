import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserController } from '@/application/controllers/user.controller';
import { TodoController } from '@/application/controllers/todo.controller';
import { UserService } from '@/core/services/user.service';
import { TodoService } from '@/core/services/todo.service';
import { TypeOrmUserRepository } from '@/infrastructure/adapters/persistence/typeorm.user.repository';
import { TypeOrmTodoRepository } from '@/infrastructure/adapters/persistence/typeorm.todo.repository';
// import { typeOrmConfig } from '@/infrastructure/config/typeorm.config';
import { UserEntity } from '@/infrastructure/adapters/persistence/entity/user.entity';
import { TodoEntity } from '@/infrastructure/adapters/persistence/entity/todo.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        namingStrategy: new SnakeNamingStrategy(),
      }),
      inject: [ConfigService],
    }),
    // TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([UserEntity, TodoEntity]),
  ],
  controllers: [UserController, TodoController],
  providers: [
    UserService,
    TodoService,
    {
      provide: 'UserRepository',
      useClass: TypeOrmUserRepository,
    },
    {
      provide: 'TodoRepository',
      useClass: TypeOrmTodoRepository,
    },
  ],
})
export class AppModule {}
