import { ConfigService } from '@nestjs/config'
import { DataSource } from 'typeorm'
import { config } from 'dotenv'
import { Admin } from '../infrastructure/application/use_cases/admin/admin.entity'
import { join } from 'path'

config()

const configService = new ConfigService()

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [Admin],
  migrations: [join(process.cwd(), 'src/resources/migrations/*.ts')],
})
