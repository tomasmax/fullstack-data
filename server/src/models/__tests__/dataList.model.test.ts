import { Data } from '@/interfaces/data.interface'
import { PaginatedDataDto } from '@/dtos/paginatedData.dto'
import DataList from '@/models/dataList.model'

jest.mock('@/mappers/data.mapper', () => ({
  mapDataListApiResponseToDataListModel: jest.fn(),
}))

const mockMappedData: Data[] = [
  {
    id: 6690,
    status: 'COMPLETED',
    createdOn: '2018-11-27T13:39:37.000Z',
    name: 'gallant_chandrasekhar',
    description: 'Etincidunt etincidunt ut voluptatem numquam dolore aliquam dolore.',
    delta: 1770,
  },
  {
    id: 6689,
    status: 'COMPLETED',
    createdOn: '2018-11-27T13:39:35.000Z',
    name: 'vibrant_hypatia',
    description: 'Quisquam eius quiquia eius dolor.',
    delta: 1273,
  },
  {
    id: 6688,
    status: 'COMPLETED',
    createdOn: '2018-11-27T08:20:59.000Z',
    name: 'agitated_galileo',
    description: 'Quisquam porro quisquam dolorem tempora modi quiquia.',
    delta: 1262,
  },
  {
    id: 6687,
    status: 'COMPLETED',
    createdOn: '2018-11-27T08:20:20.000Z',
    name: 'eloquent_davinci',
    description: 'Ipsum est labore ipsum dolorem dolor.',
    delta: 1820,
  },
  {
    id: 6684,
    status: 'COMPLETED',
    createdOn: '2018-11-26T16:01:22.000Z',
    name: 'quizzical_yalow',
    description: 'Dolor aliquam porro amet neque dolorem.',
    delta: 1352,
  },
]

describe('DataList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('filterBySearch', () => {
    it('should filter data by search keyword', () => {
      const dataList = new DataList(mockMappedData)

      const filteredDataList = dataList.filterBySearch('galileo')

      expect(filteredDataList.getData()).toEqual([
        {
          id: 6688,
          status: 'COMPLETED',
          createdOn: '2018-11-27T08:20:59.000Z',
          name: 'agitated_galileo',
          description: 'Quisquam porro quisquam dolorem tempora modi quiquia.',
          delta: 1262,
        },
      ])
    })

    it('should return the same data list if search keyword is empty', () => {
      const dataList = new DataList(mockMappedData)

      const filteredDataList = dataList.filterBySearch('')

      expect(filteredDataList.getData()).toEqual(mockMappedData)
    })
  })

  describe('filterByStatus', () => {
    it('should filter data by status', () => {
      const dataList = new DataList(mockMappedData)

      const filteredDataList = dataList.filterByStatus('COMPLETED')

      expect(filteredDataList.getData()).toEqual(mockMappedData)
    })

    it('should return the same data list if status is empty', () => {
      const dataList = new DataList(mockMappedData)

      const filteredDataList = dataList.filterByStatus('')

      expect(filteredDataList.getData()).toEqual(mockMappedData)
    })
  })

  describe('sortByKey', () => {
    it('should sort data by key in ascending order', () => {
      const dataList = new DataList(mockMappedData)

      const sortedDataList = dataList.sortByKey('name', 'asc')

      expect(sortedDataList.getData()).toEqual([
        {
          id: 6688,
          status: 'COMPLETED',
          createdOn: '2018-11-27T08:20:59.000Z',
          name: 'agitated_galileo',
          description: 'Quisquam porro quisquam dolorem tempora modi quiquia.',
          delta: 1262,
        },
        {
          id: 6687,
          status: 'COMPLETED',
          createdOn: '2018-11-27T08:20:20.000Z',
          name: 'eloquent_davinci',
          description: 'Ipsum est labore ipsum dolorem dolor.',
          delta: 1820,
        },
        {
          id: 6690,
          status: 'COMPLETED',
          createdOn: '2018-11-27T13:39:37.000Z',
          name: 'gallant_chandrasekhar',
          description: 'Etincidunt etincidunt ut voluptatem numquam dolore aliquam dolore.',
          delta: 1770,
        },
        {
          id: 6684,
          status: 'COMPLETED',
          createdOn: '2018-11-26T16:01:22.000Z',
          name: 'quizzical_yalow',
          description: 'Dolor aliquam porro amet neque dolorem.',
          delta: 1352,
        },
        {
          id: 6689,
          status: 'COMPLETED',
          createdOn: '2018-11-27T13:39:35.000Z',
          name: 'vibrant_hypatia',
          description: 'Quisquam eius quiquia eius dolor.',
          delta: 1273,
        },
      ])
    })

    it('should sort data by key in descending order', () => {
      const dataList = new DataList(mockMappedData)

      const sortedDataList = dataList.sortByKey('name', 'desc')

      expect(sortedDataList.getData()).toEqual([
        {
          id: 6689,
          status: 'COMPLETED',
          createdOn: '2018-11-27T13:39:35.000Z',
          name: 'vibrant_hypatia',
          description: 'Quisquam eius quiquia eius dolor.',
          delta: 1273,
        },
        {
          id: 6684,
          status: 'COMPLETED',
          createdOn: '2018-11-26T16:01:22.000Z',
          name: 'quizzical_yalow',
          description: 'Dolor aliquam porro amet neque dolorem.',
          delta: 1352,
        },
        {
          id: 6690,
          status: 'COMPLETED',
          createdOn: '2018-11-27T13:39:37.000Z',
          name: 'gallant_chandrasekhar',
          description: 'Etincidunt etincidunt ut voluptatem numquam dolore aliquam dolore.',
          delta: 1770,
        },
        {
          id: 6687,
          status: 'COMPLETED',
          createdOn: '2018-11-27T08:20:20.000Z',
          name: 'eloquent_davinci',
          description: 'Ipsum est labore ipsum dolorem dolor.',
          delta: 1820,
        },
        {
          id: 6688,
          status: 'COMPLETED',
          createdOn: '2018-11-27T08:20:59.000Z',
          name: 'agitated_galileo',
          description: 'Quisquam porro quisquam dolorem tempora modi quiquia.',
          delta: 1262,
        },
      ])
    })

    it('should return the same data list if key is empty', () => {
      const dataList = new DataList(mockMappedData)

      const sortedDataList = dataList.sortByKey('', 'asc')

      expect(sortedDataList.getData()).toEqual(mockMappedData)
    })
  })

  describe('paginate', () => {
    it('should paginate the data list', () => {
      const dataList = new DataList(mockMappedData)

      const paginatedData = dataList.paginate(1, 2)

      expect(paginatedData).toBeInstanceOf(PaginatedDataDto)
      expect(paginatedData.data).toEqual([
        {
          id: 6690,
          status: 'COMPLETED',
          createdOn: '2018-11-27T13:39:37.000Z',
          name: 'gallant_chandrasekhar',
          description: 'Etincidunt etincidunt ut voluptatem numquam dolore aliquam dolore.',
          delta: 1770,
        },
        {
          id: 6689,
          status: 'COMPLETED',
          createdOn: '2018-11-27T13:39:35.000Z',
          name: 'vibrant_hypatia',
          description: 'Quisquam eius quiquia eius dolor.',
          delta: 1273,
        },
      ])
      expect(paginatedData.totalItems).toBe(5)
      expect(paginatedData.totalPages).toBe(3)
      expect(paginatedData.currentPage).toBe(1)
    })

    it('should handle page exceeding total pages', () => {
      const dataList = new DataList(mockMappedData)

      const paginatedData = dataList.paginate(3, 2)

      expect(paginatedData).toBeInstanceOf(PaginatedDataDto)
      expect(paginatedData.data).toEqual([
        {
          id: 6684,
          status: 'COMPLETED',
          createdOn: '2018-11-26T16:01:22.000Z',
          name: 'quizzical_yalow',
          description: 'Dolor aliquam porro amet neque dolorem.',
          delta: 1352,
        },
      ])
      expect(paginatedData.totalItems).toBe(5)
      expect(paginatedData.totalPages).toBe(3)
      expect(paginatedData.currentPage).toBe(3)
    })
  })

  describe('getData', () => {
    it('should return the data list', () => {
      const dataList = new DataList(mockMappedData)

      const data = dataList.getData()

      expect(data).toEqual(mockMappedData)
    })
  })
})
