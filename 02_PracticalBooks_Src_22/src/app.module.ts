import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './models/products.service';
import { UsersService } from './models/users.service';
import { Product } from './models/product.entity';
import { User } from './models/user.entity';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from '@/configs/typeorm-config';
import { globalConfig } from '@/configs/global-config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(globalConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    TypeOrmModule.forFeature([Product, User]),
    AdminModule,
    AuthModule,
  ],
  controllers: [AppController, ProductsController],
  providers: [ProductsService, UsersService],
  exports: [ProductsService, UsersService],
})
export class AppModule {}
