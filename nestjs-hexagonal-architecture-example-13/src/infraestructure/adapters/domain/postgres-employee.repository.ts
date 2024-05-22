import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../../../core/domain/Employee';
import { EmployeeRepository } from '../../../core/domain/ports/outbound/EmployeeRepository';
import { EmployeesEntity } from '../../persistence/northwind-database/entities/employess.entity';

@Injectable()
export class PostgresEmployeeRepository implements EmployeeRepository {
  constructor(
    @InjectRepository(EmployeesEntity)
    private repository: Repository<EmployeesEntity>,
  ) {}

  async findById(id: any): Promise<Employee> {
    const employee = await this.repository.findOneBy({ employeeId: id });
    if (!employee) {
      throw new Error('Employee not found');
    }

    return employee;
  }

  async findAll() {
    return this.repository.find();
  }
}
