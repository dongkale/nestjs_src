import { Module } from '@nestjs/common';
import { InWebModule } from '@/board/adaptor/in-web/in-web.module';
import { BoardPersistenceModule } from '@/board/adaptor/out-persistence/board-persistence.module';

@Module({
  imports: [InWebModule, BoardPersistenceModule],
})
export class BoardModule {}
