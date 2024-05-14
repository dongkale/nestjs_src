import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController, TodoController } from './controllers';
import { DataServicesModule } from './services/data-services/data-services.module';
import { TodoUseCasesModule } from './use-cases/todo/todo-use-cases.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    DataServicesModule,
    TodoUseCasesModule,
  ],
  controllers: [AppController, TodoController],
  providers: [],
})
export class AppModule {}
