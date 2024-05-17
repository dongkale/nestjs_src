import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '@/infrastructure/usecases-proxy/usecases-proxy.module';
import { TodoController } from './todo/todo.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [TodoController],
})
export class ControllersModule {}
