import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoPersistenceModule } from '@/modules/todo-persistence/todo-persistence.module';
import { TodoWebModule } from '@/modules/todo-web/todo-web.module';
import { getTypeOrmConfig } from '@/config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    TodoPersistenceModule,
    TodoWebModule,
  ],
})
export class AppModule {}
