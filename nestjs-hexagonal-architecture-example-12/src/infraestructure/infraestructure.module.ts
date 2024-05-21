import { Module } from '@nestjs/common';
import { NorthwindDatabaseModule } from './northwind-database/northwind-database.module';

@Module({
  imports: [NorthwindDatabaseModule]
})
export class InfraestructureModule {}
