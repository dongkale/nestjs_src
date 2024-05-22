import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierRepository } from 'src/core/domain/ports/outbound/SupplierRepository';
import { SupplierEntity } from '../northwind-database/entities/supplier.entity';
import { Supplier } from 'src/core/domain/entities/Supplier';

@Injectable()
export class SupplierRepositoryAdapter implements SupplierRepository {
  constructor(
    @InjectRepository(SupplierEntity)
    private repository: Repository<SupplierEntity>,
  ) {}

  async findById(id: number): Promise<Supplier> {
    return this.repository.findOneBy({ supplierId: id });
  }
}
