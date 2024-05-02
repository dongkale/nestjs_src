import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { Repository } from 'typeorm';
import { Sample } from './entities/sample.entity';

@Injectable()
export class SampleService {
  constructor(
    @InjectRepository(Sample)
    private readonly sampleRepository: Repository<Sample>,
  ) {}
  
  async create(createSampleDto: CreateSampleDto) {          
    try {
      const result = await this.sampleRepository.save(createSampleDto, {
        reload: true,
      });

      if (!result) {
        throw new Error('Create Part Failed');
      }

      const created = await this.sampleRepository.findOne({
        where: { id: result.id },
      });

      return created;
    } catch (error) {      
      throw error;
    }

  }

  async findAll() {
    try {
      const samples = await this.sampleRepository.find();      
      return samples;
    } catch (error) {      
      throw error;
    }
  }

  async findOne(name: string) {
    try {
      const sample = await this.sampleRepository.findOne({ where: { name } });
      if (!sample) {
        throw new NotFoundException(`"${name}" Not Found.`);
      }
      return sample;
    } catch (error) {      
      throw error;
    }
  }

  async update(name: string, updateSampleDto: UpdateSampleDto) {
    try {
      const sample = await this.sampleRepository.findOne({ where: { name } });
      if (!sample) {
        throw new NotFoundException(`"${name}" Not Found.`);
      }

      await this.sampleRepository.update(sample.id, updateSampleDto);

      const updated = await this.sampleRepository.findOne({ where: { name } });

      return updated;
    } catch (error) {      
      throw error;
    }
  }

  async remove(name: string) {
    try {
      const sample = await this.sampleRepository.findOne({ where: { name } });
      if (!sample) {
        throw new NotFoundException(`"${name}" Not Found.`);
      }

      await this.sampleRepository.delete({ name: name });

      return sample;
    } catch (error) {      
      throw error;
    }
  }
}
