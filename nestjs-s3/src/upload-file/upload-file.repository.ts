import { EntityRepository, Repository } from 'typeorm';
import { UploadFile } from './entity/upload-file.entity';

@EntityRepository(UploadFile)
export class UploadFileRepository extends Repository<UploadFile> {}
