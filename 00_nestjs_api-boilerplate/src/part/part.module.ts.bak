import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartController } from './part.controller';
import { PartService } from './part.service';
import { Part } from './part.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Part])],
  controllers: [PartController],
  providers: [PartService],
})
export class PartModule {}
