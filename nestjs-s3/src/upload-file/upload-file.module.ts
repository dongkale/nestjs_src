import { Module } from '@nestjs/common';
import { UtilsModule } from '@/utils/utils.module';
import { UploadFileService } from '@/upload-file/upload-file.service';
import { UploadFileController } from '@/upload-file/upload-file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { multerOptionsFactory } from '@/upload-file/multer-options.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadFile } from '@/upload-file/entity/upload-file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UploadFile]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: multerOptionsFactory,
      inject: [ConfigService],
    }),
    UtilsModule,
  ],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
