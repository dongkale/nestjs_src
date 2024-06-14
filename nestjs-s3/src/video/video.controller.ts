import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
// import * as AWS from 'aws-sdk';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { VideoService } from '@/video/video.service';

// AWS S3
// const s3 = new AWS.S3();
// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: 'ap-northeast-2',
// });

@Controller('video')
export class VideoController {
  constructor(
    private videoService: VideoService,
    private configService: ConfigService,
  ) {}

  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(200)
  @Post('image')
  async saveImage(@UploadedFile() file: Express.Multer.File) {
    return await this.videoService.imageUpload(file);
  }
}
