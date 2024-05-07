import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { Task } from './entities/task.entity';
import { CreateTaskHandler } from './cqrs/handlers/create-task.handler';
import { ListTaskHandler } from './cqrs/handlers/list-task.handler';
import { ListByIdTaskHandler } from './cqrs/handlers/list-by-id-task.handler';
import { DeleteTaskHandler } from './cqrs/handlers/delete-task.handler';
import { UpdateByCompletedHandler } from './cqrs/handlers/update-by-completed.handler';
import { UpdateTaskHandler } from './cqrs/handlers/update-task.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), CqrsModule],
  controllers: [TaskController],
  providers: [
    CreateTaskHandler,
    ListTaskHandler,
    ListByIdTaskHandler,
    DeleteTaskHandler,
    UpdateByCompletedHandler,
    UpdateTaskHandler,
  ],
})
export class TaskModule {}
