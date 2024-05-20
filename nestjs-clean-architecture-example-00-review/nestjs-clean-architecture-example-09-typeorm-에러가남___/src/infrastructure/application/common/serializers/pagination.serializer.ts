import { IResponsePagination } from '../../../../business/core/pagination-response.interface'

export class PaginationSerializer<T> implements IResponsePagination<T> {
  constructor(
    data: T[],
    meta: {
      totalPage: number
      totalData: number
      page: number
      nextPage: string
      limit: number
    },
  ) {
    this.data = data
    this.meta = meta
  }

  data: T[]
  meta: {
    totalPage: number
    totalData: number
    page: number
    limit: number
    nextPage: string
  }
}
