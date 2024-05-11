import {
  HttpStatus,
  Module,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_PIPE } from '@nestjs/core'
import { DatabaseModule } from './database.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          errorHttpStatusCode: HttpStatus.BAD_REQUEST,
          exceptionFactory: (errors: ValidationError[]) => {
            const messages = errors.map((error) => {
              const { property, constraints } = error

              const keys = Object.keys(constraints)

              const msgs: string[] = []

              keys.forEach((key) => {
                msgs.push(`${constraints[key]}`)
              })

              return {
                property,
                errors: msgs,
              }
            })

            throw new UnprocessableEntityException(messages)
          },
        }),
    },
  ],
})
export class MainModule {}
