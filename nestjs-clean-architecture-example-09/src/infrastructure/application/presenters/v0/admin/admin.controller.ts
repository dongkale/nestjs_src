import { Controller, Get, Inject, Param } from '@nestjs/common'
import { IAdminService } from 'src/business/admin/admin.service'

@Controller('api/v0/admin')
export class AdminController {
  constructor(
    @Inject('ADMIN_SERVICE') private readonly adminService: IAdminService,
  ) {}

  @Get('/reward/:id')
  public async getAdminReward(@Param('id') adminId: number) {
    return this.adminService.getAdminReward(adminId)
  }
}
