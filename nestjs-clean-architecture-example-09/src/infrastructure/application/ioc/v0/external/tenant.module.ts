import { Module } from '@nestjs/common'
import { TenantResolver } from '../../../presenters/v0/tenant/tenant.resolver'

@Module({
  providers: [TenantResolver],
})
export class TenantModule {}
