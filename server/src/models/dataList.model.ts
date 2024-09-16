import { PaginatedDataDto } from '@/dtos/paginatedData.dto'
import { Data } from '@/interfaces/data.interface'

class DataList {
  private data: Data[]

  constructor(data: Data[]) {
    this.data = [...data]
  }

  filterBySearch(keyword: string): DataList {
    if (keyword) {
      this.data = this.data.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()))
    }
    return this
  }

  filterByStatus(status: string): DataList {
    if (status) {
      this.data = this.data.filter(item => item.status.toLowerCase() === status.toLowerCase())
    }
    return this
  }

  sortByKey(key: string, order: 'asc' | 'desc'): DataList {
    if (key) {
      this.data.sort((a, b) => ((order === 'asc' ? a[key] > b[key] : a[key] < b[key]) ? 1 : -1))
    }
    return this
  }

  paginate(page: number, limit: number): PaginatedDataDto {
    const totalItems = this.data.length
    const totalPages = Math.ceil(totalItems / limit)
    const currentPage = Math.min(page, totalPages) // Ensure currentPage does not exceed totalPages
    const startIndex = (currentPage - 1) * limit
    const paginatedData = this.data.slice(startIndex, startIndex + limit)
    return new PaginatedDataDto(paginatedData, totalItems, totalPages, currentPage)
  }

  getData(): Data[] {
    return this.data
  }
}

export default DataList
