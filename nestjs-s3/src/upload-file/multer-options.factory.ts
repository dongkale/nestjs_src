import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multerS3 from 'multer-s3';
import { basename, extname } from 'path';

export const multerOptionsFactory = (
  configService: ConfigService,
): MulterOptions => {
  const s3Forder = configService.get('AWS_S3_BUCKET_FOLDER_NAME');
  const s3AccessKeyId = configService.get('AWS_S3_ACCESS_KEY_ID');
  const s3SecretAccessKey = configService.get('AWS_S3_SECRET_ACCESS_KEY');
  const s3region = configService.get('AWS_REGION');
  const s3BucketName = configService.get('AWS_S3_BUCKET_NAME');

  return {
    storage: multerS3({
      s3: new S3Client({
        region: s3region,
        credentials: {
          accessKeyId: s3AccessKeyId,
          secretAccessKey: s3SecretAccessKey,
        },
      }),
      bucket: s3BucketName,
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata(req, file, callback) {
        callback(null, { owner: 'it' });
      },
      key(req, file, callback) {
        const folder = s3Forder;
        const ext = extname(file.originalname); // 확장자
        const baseName = basename(file.originalname, ext); // 확장자 제외
        // 파일이름-날짜.확장자
        const fileName =
          ext === '.mp4'
            ? `${folder}/videos/${baseName}-${Date.now()}${ext}`
            : `${folder}/images/${baseName}-${Date.now()}${ext}`;
        callback(null, fileName);
      },
    }),
    // 파일 크기 제한
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  };
};
