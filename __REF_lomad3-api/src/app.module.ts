import { join } from 'path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './common/database.module';
import { GoogleChatModule } from './google-chat/google-chat.module';
import { HealthModule } from './health/health.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { MyModule } from './my/my.module';
import { ProductsModule } from './products/products.module';

const path = process.env.GRAPHQL_ENDPOINT || '/graphql';
const isDebug = process.env.NODE_ENV !== 'production';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema/schema.graphql'),
      path,
      playground: isDebug,
    }),
    CommonModule,
    DatabaseModule,
    AuthModule,
    HealthModule,
    GoogleChatModule,
    ProductsModule,
    MyModule,
  ],
})
export class AppModule {
  configure(consumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
