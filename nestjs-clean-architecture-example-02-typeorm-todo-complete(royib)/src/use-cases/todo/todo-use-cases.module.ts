import { Module } from '@nestjs/common';
import { DataServicesModule } from '@/services/data-services/data-services.module';
import { TodoFactoryService } from '@/use-cases/todo/todo-factory.service';
import { TodoUseCases } from '@/use-cases/todo/todo.use-case';

@Module({
  imports: [DataServicesModule],
  providers: [TodoFactoryService, TodoUseCases],
  exports: [TodoFactoryService, TodoUseCases],
})
export class TodoUseCasesModule {}
