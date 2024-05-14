import { Inject, Injectable } from '@nestjs/common'
import { IAdminService } from '../../../../business/admin/admin.service'
import { IAdminRepository } from '../../../../business/admin/admin.repository'

@Injectable()
export class AdminService implements IAdminService {
  constructor(
    @Inject('ADMIN_REPOSITORY')
    private readonly adminRepository: IAdminRepository,
  ) {}

  async all() {
    return []
  }

  async getAdminReward(adminId: number) {
    return await this.adminRepository.getAdminReward(adminId)
  }
}
