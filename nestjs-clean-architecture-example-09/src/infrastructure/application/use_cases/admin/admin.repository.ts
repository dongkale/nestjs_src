import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Admin } from './admin.entity'

@Injectable()
export class AdminRepository extends Repository<Admin> {
  constructor(
    @InjectRepository(Admin) private readonly repository: Repository<Admin>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner)
  }

  public async getAdminReward(adminId: number) {
    try {
      return `admin: ${adminId}`
    } catch (error) {
      throw error
    }
  }
}
