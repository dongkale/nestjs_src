import {
  Injectable,
  Logger,
  NotFoundException,
  UseFilters,
} from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Part } from './part.entity';
import { CreatePartDto, ResponsePartDto, UpdatePartDto } from './dto/part.dto';

@Injectable()
export class PartService {
  private readonly logger = new Logger(PartService.name);

  constructor(
    @InjectRepository(Part)
    private readonly partRepository: Repository<Part>,
  ) {}

  // toResponsePartDto(list: Part[]): ResponsePartDto[] {
  //   const response: ResponsePartDto[] = [];

  //   if (!Array.isArray(list)) {
  //     return [];
  //   }

  //   for (const part of list) {
  //     response.push({
  //       id: part.id,
  //       name: part.name,
  //       description: part.description,
  //       dataJson: part.dataJson,
  //     });

  //     // const parseData = JSON.parse(part.dataJson);
  //     // this.logger.debug(parseData);
  //     this.logger.debug(
  //       `List: id: ${part.id}, name: ${part.name}, description: ${part.description}, data_json: ${JSON.stringify(part.dataJson)}, created_at: ${part.createdAt}, updated_at: ${part.updatedAt}`,
  //     );
  //   }

  //   return response;
  // }

  async findAll(): Promise<ResponsePartDto[]> {
    try {
      const parts = await this.partRepository.find();

      // const response: ResponsePartDto[] = [];

      // if (Array.isArray(parts)) {
      //   for (const part of parts) {
      //     const parseData = JSON.parse(part.dataJson);
      //     this.logger.debug(parseData);
      //     this.logger.debug(
      //       `List: id: ${part.id}, name: ${part.name}, description: ${part.description}, data_json: ${JSON.stringify(part.dataJson)}, created_at: ${part.createdAt}, updated_at: ${part.updatedAt}`,
      //     );
      //   }
      // }
      // const s = ResponsePartDto.convertFromPart(null);
      // console.log(s);

      return ResponsePartDto.convertFromPart(parts);
      // return this.toResponsePartDto(parts);
      // return parts;
    } catch (error) {
      this.logger.debug(error);
      throw error;
    }
  }

  async findOne(id: number): Promise<Part> {
    try {
      const part = await this.partRepository.findOne({ where: { id } });
      // if (!part) {
      //   throw new NotFoundException(`${id} Not Found.`);
      // }
      return ResponsePartDto.convertFromPart([part])?.[0] || null;
      // return part ? this.toResponsePartDto([part])[0] : null;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async create(createPartDto: CreatePartDto): Promise<Part> {
    try {
      const result = await this.partRepository.save(createPartDto, {
        reload: true,
      });

      const created = await this.partRepository.findOne({
        where: { id: result.id },
      });

      return ResponsePartDto.convertFromPart([created])?.[0] || null;
    } catch (error) {
      this.logger.debug(error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const part = await this.partRepository.findOne({ where: { id } });
      if (!part) {
        throw new NotFoundException(`${id} Not Found.`);
      }

      // const result = await this.partRepository.softDelete({
      //   id,
      // });

      await this.partRepository.delete({ id: id });

      return ResponsePartDto.convertFromPart([part])?.[0] || null;
    } catch (error) {
      this.logger.debug(error);
      throw error;
    }
  }

  async update(id: number, updatePart: UpdatePartDto) {
    try {
      const part = await this.partRepository.findOne({ where: { id } });
      if (!part) {
        throw new NotFoundException(`${id} Not Found.`);
      }

      await this.partRepository.save({
        ...part,
        ...updatePart,
      });

      const updated = await this.partRepository.findOne({ where: { id } });

      return ResponsePartDto.convertFromPart([updated])?.[0] || null;
    } catch (error) {
      this.logger.debug(error);
      throw error;
    }
  }

  // async findPart(id: number): Promise<Part> {
  //   let part;
  //   try {
  //     part = await this.partRepository.findOneBy({ id: id });
  //     return part || null;
  //   } catch (error) {
  //     return null;
  //   }
  // }
}
