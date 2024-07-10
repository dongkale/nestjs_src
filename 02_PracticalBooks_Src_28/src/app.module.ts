import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from '@/configs/typeorm-config';
import { AppController } from '@/app.controller';
import { ProductsController } from '@/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from '@/models/products.service';
import { UsersService } from '@/models/users.service';
import { OrdersService } from '@/models/orders.service';
import { Product } from '@/models/product.entity';
import { User } from '@/models/user.entity';
import { Order } from '@/models/order.entity';
import { AdminModule } from '@/admin/admin.module';
import { AuthModule } from '@/auth/auth.module';
import { CartModule } from '@/cart/cart.module';
import { AccountModule } from '@/account/account.module';
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
    TypeOrmModule.forFeature([Product, User, Order]),
    AdminModule,
    AuthModule,
    CartModule,
    AccountModule,
  ],
  controllers: [AppController, ProductsController],
  providers: [ProductsService, UsersService, OrdersService],
  exports: [ProductsService, UsersService, OrdersService],
})
export class AppModule {}
