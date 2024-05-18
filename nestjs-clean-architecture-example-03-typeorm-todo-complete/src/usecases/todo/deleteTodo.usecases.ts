import { Logger } from '@nestjs/common';
// import { ILogger } from '@/domain/logger/logger.interface';
import { TodoRepository } from '@/domain/repositories/todoRepository.interface';

export class deleteTodoUseCases {
  private readonly logger = new Logger(deleteTodoUseCases.name);
  constructor(
    // private readonly logger: ILogger,
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.todoRepository.deleteById(id);
    this.logger.log(`deleteTodoUseCases execute: Todo ${id} have been deleted`);
  }
}
