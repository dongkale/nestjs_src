import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { ILike } from 'typeorm'

export const SearchQuery = createParamDecorator(
  (data: { mustExists: any; columns: string[] }, context: ExecutionContext) => {
    const req: Request = context.switchToHttp().getRequest()

    const search = req.query.q ? req.query.q : ''

    const parsedSearch = `%${search}%`

    if (search.length > 0) {
      const obj = data.columns.map((column) => {
        const object = {
          [column]: ILike(parsedSearch),
          ...data.mustExists,
        }

        return object
      })

      return obj
    } else {
      return {
        ...data.mustExists,
      }
    }
  },
)
