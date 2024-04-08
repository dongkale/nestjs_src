import { Module } from '@nestjs/common';
import { MathService } from './math.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MathService],
})
export class MathModule {}
