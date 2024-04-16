import {
  Injectable,
  Logger,
  NotFoundException,
  UseFilters,
} from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Sample } from './sample.entity';
import { CreateSampleDto, UpdateSampleDto } from './dto/sample.dto';

@Injectable()
export class SampleService {
  private readonly logger = new Logger(SampleService.name);

  constructor(
    @InjectRepository(Sample)
    private readonly sampleRepository: Repository<Sample>,
  ) {}

  async findAll(): Promise<Sample[]> {
    try {
      const samples = await this.sampleRepository.find();

      if (Array.isArray(samples)) {
        for (const sample of samples) {
          const parseData = JSON.parse(sample.dataJson);
          this.logger.debug(parseData);
          this.logger.debug(
            `List: id: ${sample.id}, name: ${sample.name}, description: ${sample.description}, data_json: ${JSON.stringify(sample.dataJson)}, created_at: ${sample.createdAt}, updated_at: ${sample.updatedAt}`,
          );
        }
      }

      return samples;
    } catch (error) {
      this.logger.debug(error);
      throw error;
    }
  }

  async findOne(id: number): Promise<Sample> {
    try {
      const sample = await this.sampleRepository.findOne({ where: { id } });
      // if (!sample) {
      //   throw new NotFoundException(`id: ${id} Not Found.`);
      // }
      this.logger.debug(sample);
      return sample;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async create(createSampleDto: CreateSampleDto): Promise<Sample> {
    try {
      const result = await this.sampleRepository.save(createSampleDto);
      this.logger.debug(result);
      return result;
    } catch (error) {
      this.logger.debug(error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const sample = await this.sampleRepository.findOne({ where: { id } });
      if (!sample) {
        throw new NotFoundException(`id: ${id} Not Found.`);
      }
      this.logger.debug(sample);

      // const result = await this.sampleRepository.softDelete({
      //   id,
      // });

      await this.sampleRepository.delete({ id: id });

      return sample;
    } catch (error) {
      this.logger.debug(error);
      throw error;
    }
  }

  async update(id: number, updateSample: UpdateSampleDto) {
    try {
      const sample = await this.sampleRepository.findOne({ where: { id } });
      if (!sample) {
        throw new NotFoundException(`id: ${id} Not Found.`);
      }
      this.logger.debug(sample);

      const result = await this.sampleRepository.save({
        ...sample,
        ...updateSample,
      });
      return result;
    } catch (error) {
      this.logger.debug(error);
      throw error;
    }
  }

  // async findSample(id: number): Promise<Sample> {
  //   let sample;
  //   try {
  //     sample = await this.sampleRepository.findOneBy({ id: id });
  //     return sample || null;
  //   } catch (error) {
  //     return null;
  //   }
  // }
}
