import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class AwsService {
  s3Client: S3Client;
  s3AccessKeyId: string;
  s3SecretAccessKey: string;

  s3Forder: string;
  s3region: string;
  s3BucketName: string;

  constructor(private configService: ConfigService) {
    this.s3Forder = this.configService.get('AWS_S3_BUCKET_FOLDER_NAME');
    this.s3AccessKeyId = this.configService.get('AWS_S3_ACCESS_KEY_ID');
    this.s3SecretAccessKey = this.configService.get('AWS_S3_SECRET_ACCESS_KEY');
    this.s3region = this.configService.get('AWS_REGION');
    this.s3BucketName = this.configService.get('AWS_S3_BUCKET_NAME');

    this.s3Client = new S3Client({
      region: this.s3region,
      credentials: {
        accessKeyId: this.s3AccessKeyId,
        secretAccessKey: this.s3SecretAccessKey,
      },
    });
  }

  async imageUploadToS3(
    fileName: string,
    file: Express.Multer.File,
    ext: string,
  ) {
    const command = new PutObjectCommand({
      Bucket: this.s3BucketName,
      Key: `${this.s3Forder}/${fileName}`,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: `image/${ext}`,
    });

    // new DelteObjectCommand({
    //   Bucket: '버킷명',
    //   Delete: {
    //     Objects: [{ Key: '키값 1' }, { Key: '키값2' }],
    //   },
    // });

    const result = await this.s3Client.send(command);

    // 'https://lennonbucket.s3.ap-northeast-2.amazonaws.com/test/images/%EC%BB%B4%ED%93%A8%ED%84%B0%EC%82%AC%EC%96%91-1718350214719.png',
    return `https://s3.${this.s3region}.amazonaws.com/${this.s3BucketName}/${this.s3Forder}/${fileName}`;
  }

  // async videoUploadToS3(fileName: string, file: Multer.File, ext: string) {
  //   const command = new PutObjectCommand({
  //     Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
  //     Key: fileName,
  //     Body: file.buffer,
  //     ACL: 'public-read',
  //     ContentType: `video/${ext}`,
  //   });

  //   await this.s3Client.send(command);
  //   return `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET_NAME}/${fileName}`;
  // }
}
