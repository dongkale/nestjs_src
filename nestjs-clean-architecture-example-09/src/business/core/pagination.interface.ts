export interface IPagination {
  page: number
  limit: number
  offset: number
  nextPage: string
  sortBy: string
  order: 'ASC' | 'DESC'
}
