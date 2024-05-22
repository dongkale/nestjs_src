import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../../../core/domain/Customer';
import { CustomerRepository } from '../../../core/domain/ports/outbound/CustomerRepository';
import { CustomersEntity } from '../../persistence/northwind-database/entities/customer.entity';

@Injectable()
export class PostgresCustomerRepository implements CustomerRepository {
  constructor(
    @InjectRepository(CustomersEntity)
    private repository: Repository<CustomersEntity>,
  ) {}

  async findById(id: any): Promise<Customer> {
    const customer = await this.repository.findOne({
      where: { customerId: id },
    });
    if (!customer) {
      throw new Error('Customer not found');
    }

    return customer;
  }

  async findAll() {
    return this.repository.find();
  }
}
