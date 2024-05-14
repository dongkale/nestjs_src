import { Module } from '@nestjs/common'
import { TenantModule } from './external/tenant.module'

@Module({
  imports: [TenantModule],
})
export class ExternalModule {}
