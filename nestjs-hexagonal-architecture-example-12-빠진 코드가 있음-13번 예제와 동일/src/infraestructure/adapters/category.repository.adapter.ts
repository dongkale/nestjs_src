import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/core/domain/ports/outbound/CategoryRespository';
import { CategoryEntity } from '../northwind-database/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/core/domain/entities/Category';

@Injectable()
export class CategoryRepositoryAdapter implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {}

  async findById(id: number): Promise<Category> {
    return this.repository.findOneBy({ categoryId: id });
  }

  async findAll(): Promise<Category[]> {
    return this.repository.find();
  }
}
