import { Data } from '@/interfaces/data.interface'

export class PaginatedDataDto {
  public data: Data[]
  public totalItems: number
  public totalPages: number
  public currentPage: number

  constructor(data: Data[], totalItems: number, totalPages: number, currentPage: number) {
    this.data = data
    this.totalItems = totalItems
    this.totalPages = totalPages
    this.currentPage = currentPage
  }
}
