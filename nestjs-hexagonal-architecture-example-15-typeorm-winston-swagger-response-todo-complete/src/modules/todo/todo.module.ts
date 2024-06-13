import { Module } from '@nestjs/common';
import { InWebModule } from '@/todo/adaptor/in-web/in-web.module';
import { TodoPersistenceModule } from '@/todo/adaptor/out-persistence/todo-persistence.module';

@Module({
  imports: [InWebModule, TodoPersistenceModule],
})
export class TodoModule {}
