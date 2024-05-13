import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from '@/infrastructure/config/config.schema';
import { LoggerModule } from '@infrastructure/logger/logger.module';
import { ExceptionsModule } from '@infrastructure/exceptions/exceptions.module';
import { TasksModule } from '@infrastructure/controllers/tasks/tasks.module';
import { AuthModule } from '@infrastructure/controllers/auth/auth.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'; // Add this line

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      // envFilePath: [`.env.stage.${process.env.STAGE}`],
      envFilePath: [`.env`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';

        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          type: 'mysql',
          autoLoadEntities: true,
          synchronize: false,
          namingStrategy: new SnakeNamingStrategy(),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
    ExceptionsModule,
    LoggerModule,
    TasksModule,
  ],
})
export class AppModule {}
