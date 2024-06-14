import { Injectable } from '@nestjs/common';
import { AwsService } from '@/aws/aws.service';
import { UtilsService } from '@/utils/utils.service';

@Injectable()
export class VideoService {
  constructor(
    private readonly utilsService: UtilsService,
    private readonly awsService: AwsService,
  ) {}

  async saveImage(file: Express.Multer.File) {
    return await this.imageUpload(file);
  }

  async imageUpload(file: Express.Multer.File) {
    const imageName = this.utilsService.getUUID();
    const ext = file.originalname.split('.').pop();

    const imageUrl = await this.awsService.imageUploadToS3(
      `${imageName}.${ext}`,
      file,
      ext,
    );

    return { imageUrl };
  }
}
