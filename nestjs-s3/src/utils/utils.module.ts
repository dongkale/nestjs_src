import { Module } from '@nestjs/common';
import { UtilsService } from '@/utils/utils.service';

@Module({
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}
