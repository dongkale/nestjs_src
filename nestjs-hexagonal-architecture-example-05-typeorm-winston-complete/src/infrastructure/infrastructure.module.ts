import { Module } from '@nestjs/common';
import ApplicationModule from '@/application/application.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ProductController from '@/infrastructure/controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from '@/configs/database.config';

@Module({
  imports: [
    ApplicationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
  ],
  controllers: [ProductController],
})
export class InfrastructureModule {}
