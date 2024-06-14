import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { UploadFileService } from '@/upload-file/upload-file.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

// // AWS S3
// const s3 = new AWS.S3();
// AWS.config.update({
//   accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

@Controller('/file')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  //   @Post()
  //   @UseInterceptors(
  //     FilesInterceptor('file', 10, {
  //       storage: multerS3({
  //         s3: s3,
  //         bucket: process.env.AWS_S3_BUCKET_NAME,
  //         acl: 'public-read',
  //         key: function (request, file, cb) {
  //           cb(null, `${Date.now().toString()}-${file.originalname}`);
  //         },
  //       }),
  //       limits: {},
  //     }),
  //   )
  //   async uploadFile(@UploadedFiles() files: Express.MulterS3.File[]) {
  //     return this.uploadFileService.uploadFile(files);
  //   }

  //   @Post()
  //   @UseInterceptors(
  //     FileFieldsInterceptor([
  //       { name: 'video', maxCount: 1 },
  //       { name: 'image', maxCount: 1 },
  //     ]),
  //   )
  //   async upload(@UploadedFiles() files: Express.MulterS3.File[]) {
  //     // const { video, image } = JSON.parse(JSON.stringify(files));
  //     // const { userId: owner } = uploadFilesDto;

  //     return this.uploadFileService.uploadFiles(files);

  //     // await this.commandBus.execute(
  //     //   new UploadFilesCommand(owner, video[0].location, image[0].location),
  //     // );
  //   }

  @Post('image')
  @UseInterceptors(FilesInterceptor('files', 3))
  uploadProfileImage(@UploadedFiles() files: Express.MulterS3.File[]) {
    return this.uploadFileService.uploadFiles(files);
    // return { url: files[0].location };
  }
}
