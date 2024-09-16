import axios from 'axios'
import DataService, { DATA_URL } from '@/services/data.service'
import { DataRequestQuery } from '@/controllers/data.controller'
import CacheService from '../cache.service'
import { PaginatedDataDto } from '@/dtos/paginatedData.dto'
import stringify from 'json-stable-stringify'

jest.mock('axios')
const mockAxiosGet = axios.get as jest.Mock

const dataApiResponse = {
  output: [
    {
      id: 6690,
      status: 'COMPLETED',
      createdOn: 1543325977000,
      name: 'gallant_chandrasekhar',
      description: 'Etincidunt etincidunt ut voluptatem numquam dolore aliquam dolore.',
      delta: 1770,
    },
    {
      id: 6689,
      status: 'COMPLETED',
      createdOn: 1543325975000,
      name: 'vibrant_hypatia',
      description: 'Quisquam eius quiquia eius dolor.',
      delta: 1273,
    },
    {
      id: 6688,
      status: 'COMPLETED',
      createdOn: 1543306859000,
      name: 'agitated_galileo',
      description: 'Quisquam porro quisquam dolorem tempora modi quiquia.',
      delta: 1262,
    },
    {
      id: 6687,
      status: 'COMPLETED',
      createdOn: 1543306820000,
      name: 'eloquent_davinci',
      description: 'Ipsum est labore ipsum dolorem dolor.',
      delta: 1820,
    },
    {
      id: 6684,
      status: 'COMPLETED',
      createdOn: 1543248082000,
      name: 'quizzical_yalow',
      description: 'Dolor aliquam porro amet neque dolorem.',
      delta: 1352,
    },
  ],
}
const defaultQuery: DataRequestQuery = { search: '', status: '', page: '1', limit: '20' }

describe('DataService', () => {
  let dataService: DataService
  let cacheMock: jest.Mocked<CacheService>

  beforeEach(() => {
    cacheMock = {
      get: jest.fn(),
      set: jest.fn(),
      flushAll: jest.fn(),
    } as unknown as jest.Mocked<CacheService>

    dataService = new DataService(cacheMock)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('fetchData', () => {
    it('should fetch and transform data', async () => {
      mockAxiosGet.mockResolvedValue({ data: dataApiResponse })

      const spyFetchData = jest.spyOn(dataService as any, 'fetchData').mockResolvedValue(dataApiResponse)

      const result = await dataService.fetchAndTransformData(defaultQuery)

      expect(spyFetchData).toHaveBeenCalledWith(DATA_URL)
      expect(result).toBeDefined()
      spyFetchData.mockRestore()
    })

    it('should use cache if available', async () => {
      const cachedData = new PaginatedDataDto(
        [
          {
            id: 6669,
            status: 'CANCELED',
            createdOn: '2018-11-20T13:52:51.000Z',
            name: 'epic_chandrasekhar',
            description: 'Porro consectetur magnam modi neque sit modi.',
            delta: 21,
          },
        ],
        1,
        1,
        1,
      )
      const searchQuery: DataRequestQuery = { search: 'epic', status: 'CANCELED', page: '1', limit: '20' }
      const cacheKey = stringify(searchQuery)

      jest.spyOn(cacheMock, 'get').mockReturnValue(cachedData)
      const spyFetchData = jest.spyOn(dataService as any, 'fetchData')

      const result = await dataService.fetchAndTransformData(searchQuery)

      expect(cacheMock.get).toHaveBeenCalledWith(cacheKey)
      expect(spyFetchData).not.toHaveBeenCalled()
      expect(result).toEqual(cachedData)
    })

    it('should set cache after fetching data', async () => {
      mockAxiosGet.mockResolvedValue({ data: dataApiResponse })

      const spyFetchData = jest.spyOn(dataService as any, 'fetchData').mockResolvedValue(dataApiResponse)
      const spyCacheSet = jest.spyOn(cacheMock, 'set')

      const result = await dataService.fetchAndTransformData(defaultQuery)

      const cacheKey = stringify(defaultQuery)
      expect(spyFetchData).toHaveBeenCalledWith(DATA_URL)
      expect(spyCacheSet).toHaveBeenCalledWith(cacheKey, result)
      expect(result).toBeDefined()
      spyFetchData.mockRestore()
    })

    it('should handle fetch data error', async () => {
      const errorMessage = 'Network Error'
      mockAxiosGet.mockRejectedValue(new Error(errorMessage))

      const spyFetchData = jest.spyOn(dataService as any, 'fetchData').mockRejectedValue(new Error(errorMessage))

      await expect(dataService.fetchAndTransformData(defaultQuery)).rejects.toThrow(errorMessage)
      expect(spyFetchData).toHaveBeenCalledWith(DATA_URL)
      spyFetchData.mockRestore()
    })
  })
})
