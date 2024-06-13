import { Module } from '@nestjs/common';
import { InWebModule } from '@/todo/adaptor/in-web/in-web.module';
import { BoardPersistenceModule } from '@/todo/adaptor/out-persistence/board-persistence.module';

@Module({
  imports: [InWebModule, BoardPersistenceModule],
})
export class BoardModule {}
