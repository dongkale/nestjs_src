import { Module } from '@nestjs/common';
import { AppController, TodoController } from './controllers';
import { DataServicesModule } from './services/data-services/data-services.module';
import { TodoUseCasesModule } from './use-cases/todo/todo-use-cases.module';

@Module({
  imports: [DataServicesModule, TodoUseCasesModule],
  controllers: [AppController, TodoController],
  providers: [],
})
export class AppModule {}
