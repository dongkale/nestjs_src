import { Logger } from '@nestjs/common';
// import { ILogger } from '@//domain/logger/logger.interface';
import { TodoModel } from '@/domain/model/todo';
import { TodoRepository } from '@/domain/repositories/todoRepository.interface';

export class updateTodoUseCases {
  private readonly logger = new Logger(updateTodoUseCases.name);
  constructor(
    // private readonly logger: ILogger,
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute(id: number, isDone: boolean): Promise<TodoModel> {
    await this.todoRepository.updateContent(id, isDone);
    this.logger.log('updateTodoUseCases execute', `Todo ${id} have been updated`);

    return await this.todoRepository.findById(id);
  }
}
