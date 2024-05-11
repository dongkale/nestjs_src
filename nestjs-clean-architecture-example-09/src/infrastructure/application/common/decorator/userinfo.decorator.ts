import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const UserInfo = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()

    return req.user[data] ? req.user[data] : req.user
  },
)
