import { DataRequestQuery } from '@/controllers/data.controller'
import DataList from '@/models/dataList.model'
import axios from 'axios'
import { PaginatedDataDto } from '@/dtos/paginatedData.dto'
import CacheService from './cache.service'
import stringify from 'json-stable-stringify'
import { mapDataListApiResponseToDataListModel } from '@/mappers/data.mapper'

export const DATA_URL = 'https://storage.googleapis.com/king-airnd-recruitment-sandbox-data/data.json'

class DataService {
  private cache: CacheService

  constructor(cache: CacheService = new CacheService({ stdTTL: 600 })) {
    this.cache = cache
  }

  private generateCacheKey(params: DataRequestQuery): string {
    return stringify(params)
  }

  private async fetchData(url: string) {
    try {
      const cachedData = this.cache.get<DataList>(url)
      if (cachedData) {
        return cachedData
      }

      const response = await axios.get(url)
      this.cache.set(url, response.data)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        console.error('[DataService.fetchData]: Axios error:', error.message)
      }
      throw error
    }
  }

  public async fetchAndTransformData({ search, status, page = '1', limit = '20', sort }: DataRequestQuery) {
    const cacheKey = this.generateCacheKey({ search, status, page, limit, sort })
    const cachedData = this.cache.get<PaginatedDataDto>(cacheKey)
    if (cachedData) {
      return cachedData
    }

    const response = await this.fetchData(DATA_URL)
    const dataList = new DataList(mapDataListApiResponseToDataListModel(response.output))

    const filteredDataList = dataList.filterBySearch(search).filterByStatus(status).paginate(parseInt(page), parseInt(limit))
    this.cache.set(cacheKey, filteredDataList)

    return filteredDataList
  }

  public clearCache(): void {
    this.cache.flushAll()
  }
}

export default DataService
