import { repl } from '@nestjs/core'
import { AppModule } from './infrastructure/application/app.module'

export async function bootstrap() {
  await repl(AppModule)
}
bootstrap()
