import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '@/configs/typeorm-config';
import { VideoModule } from '@/video/video.module';
import { UploadFileModule } from '@/upload-file/upload-file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    VideoModule,
    UploadFileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
