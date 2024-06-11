import { globalConfig } from '@/common/config/global-config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '@/common/config/orm-config';
import { TodoModule } from '@/todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot(globalConfig),
    TypeOrmModule.forRoot(typeOrmConfig),
    TodoModule,
  ],
})
export class AppModule {}
