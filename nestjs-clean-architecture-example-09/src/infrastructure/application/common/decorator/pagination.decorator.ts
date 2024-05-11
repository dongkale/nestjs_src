import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const metaData = (payload: {
  totalCount: number
  page: number
  limit: number
  nextPage: string
}) => {
  const totalPage =
    payload.totalCount > 0 ? Math.ceil(payload.totalCount / payload.limit) : 1

  return {
    totalPage,
    totalData: payload.totalCount,
    page: payload.page,
    limit: payload.limit,
    nextPage: payload.nextPage,
  }
}

export const Paginate = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()

    const params = request.query
    const page = params.page ? params.page : 1
    const limit = params.limit ? Number(params.limit) : 10
    const sortBy = params['sort-by'] ? params['sort-by'] : 'createdAt'
    const order = params.order ? params.order : 'DESC'

    const offset = page > 1 ? page * limit - limit : 0
    const nextPage = `${request.protocol}://${request.get('Host')}${
      request.url
    }?page=${page + 1}&limit=${limit}`

    return {
      page,
      limit,
      offset,
      sortBy,
      order,
      nextPage,
    }
  },
)
