export interface IResponsePagination<T> {
  data: T[]
  meta: {
    totalPage: number
    totalData: number
    page: number
    limit: number
    nextPage: string
  }
}
