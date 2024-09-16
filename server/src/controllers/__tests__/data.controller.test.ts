import request from 'supertest'
import App from '@/app'
import DataRoute from '@/routes/data.route'
import axios from 'axios'

// jest.mock('@/services/data.service')
jest.mock('axios')

let app: App
let dataRoute: DataRoute
const mockAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>
// const mockDataService = DataService as jest.MockedClass<typeof DataService>

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

const expectedResponse = {
  data: [
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
  ],
  totalItems: 5,
  totalPages: 1,
  currentPage: 1,
}

beforeEach(async () => {
  dataRoute = new DataRoute()
  app = new App([dataRoute])
})

describe('Testing Data Controller', () => {
  describe('[GET] /data', () => {
    it('response statusCode 200', () => {
      mockAxiosGet.mockResolvedValue({
        data: dataApiResponse,
      })
      return request(app.getServer()).get(`${dataRoute.path}`).expect(200)
    })

    it('should return paginated data', async () => {
      mockAxiosGet.mockResolvedValue({
        data: dataApiResponse,
      })
      const response = await request(app.getServer()).get(`${dataRoute.path}`)
      expect(response.status).toBe(200)
      expect(response.body).toEqual(expectedResponse)
    })

    it('should handle unexpected errors', async () => {
      const errorMessage = 'Something went wrong'
      mockAxiosGet.mockRejectedValue(new Error(errorMessage))

      const response = await request(app.getServer()).get(`${dataRoute.path}`)
      expect(response.status).toBe(500)
      expect(response.body.message).toBe(errorMessage)
    })

    it('should handle 404 errors', async () => {
      const errorResponse = {
        status: 404,
        message: 'Not Found',
      }
      mockAxiosGet.mockRejectedValue(errorResponse)

      const response = await request(app.getServer()).get(`${dataRoute.path}`)
      expect(response.status).toBe(errorResponse.status)
      expect(response.body.message).toBe(errorResponse.message)
    })
  })
})
