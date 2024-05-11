import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminResolver } from '../../../presenters/v0/admin/admin.resolver'
import { Admin } from '../../../use_cases/admin/admin.entity'
import { AdminService } from '../../../use_cases/admin/admin.service'
import { AdminRepository } from '../../../use_cases/admin/admin.repository'
import { AdminController } from 'src/infrastructure/application/presenters/v0/admin/admin.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [
    AdminResolver,
    {
      provide: 'ADMIN_SERVICE',
      useClass: AdminService,
    },
    {
      provide: 'ADMIN_REPOSITORY',
      useClass: AdminRepository,
    },
  ],
  exports: [AdminResolver],
})
export class AdminModule {}
