import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadFile } from '@/upload-file/entity/upload-file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UploadFileService {
  constructor(
    @InjectRepository(UploadFile)
    private readonly uploadFileRepository: Repository<UploadFile>,
  ) {}

  async uploadFiles(files: Express.MulterS3.File[]) {
    console.log(files);

    const uploadfilePaths = [];
    const uploadfiles = [];
    for (const file of files) {
      const upFile = new UploadFile();
      upFile.originalName = file.originalname;
      upFile.encoding = file.encoding;
      upFile.mimeType = file.mimetype;
      upFile.size = file.size;
      upFile.url = file.location;

      uploadfilePaths.push({
        origin: file.originalname,
        target: file.location,
      });

      uploadfiles.push(upFile);
    }

    try {
      // await this.uploadFileRepository.save(uploadfiles);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return uploadfilePaths;
  }

  async uploadFile(file: Express.MulterS3.File) {
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }

    const uploadfiles = [];

    // for (const element of files) {
    //   const file = new UploadFile();
    //   file.originalName = element.originalname;
    //   file.encoding = element.encoding;
    //   file.mimeType = element.mimetype;
    //   file.size = element.size;

    //   // file.url = element.location;
    //   uploadfiles.push(file);
    // }

    try {
      return { data: await this.uploadFileRepository.save(uploadfiles) };
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    // return { url: file.location };
  }
}
