import { Query, Resolver } from '@nestjs/graphql';
import { Admin } from '@/infrastructure/application/use_cases/admin/admin.entity';
import { Inject } from '@nestjs/common';
import { IAdminService } from '@/business/admin/admin.service';

@Resolver(() => Admin)
export class AdminResolver {
  constructor(
    @Inject('ADMIN_SERVICE') private readonly adminService: IAdminService,
  ) {}

  @Query(() => [Admin])
  async admins() {
    return this.adminService.all();
  }
}
