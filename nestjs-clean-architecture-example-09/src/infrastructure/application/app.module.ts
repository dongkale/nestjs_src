import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { join } from 'path';
import { DatabaseConfig } from '../configs/database.config';
import { ExternalModule } from './ioc/v0/external.module';
import { InternalModule } from './ioc/v0/internal.module';

@Module({
  imports: [
    // ConfigModule initiate
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    // using graphql (remove this line code to stop using graphql and use rest instead)
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      debug: false,
      autoSchemaFile: join(process.cwd(), 'src/resources/internal-schema.gql'),
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground,
        // ApolloServerPluginUsageReporting,
      ],
      path: '/admin',
      include: [InternalModule],
    }),

    GraphQLModule.forRoot({
      driver: ApolloDriver,
      debug: false,
      autoSchemaFile: join(process.cwd(), 'src/resources/external-schema.gql'),
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground,
        // ApolloServerPluginUsageReporting,
      ],
      path: '/ql',
      include: [ExternalModule],
    }),

    // Database Config Module /src/infrastructure/configs
    DatabaseConfig,

    InternalModule,
    ExternalModule,
  ],
})
export class AppModule {}
