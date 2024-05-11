import { Module } from '@nestjs/common'
import { AdminModule } from './internal/admin.module'

@Module({
  imports: [AdminModule],
  exports: [AdminModule],
})
export class InternalModule {}
