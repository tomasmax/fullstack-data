import { PaginatedDataDto } from '@/dtos/paginatedData.dto'
import DataService from '@services/data.service'
import { NextFunction, Request, Response } from 'express'

export interface DataRequestQuery {
  search?: string
  status?: string
  page?: string
  limit?: string
  sort?: string
}

class DataController {
  private dataService = new DataService()

  public getData = async (req: Request<{}, {}, {}, DataRequestQuery>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { search, status, page, limit, sort } = req.query

      const transformedData: PaginatedDataDto = await this.dataService.fetchAndTransformData({ search, status, page, limit, sort })

      res.status(200).json(transformedData)
    } catch (error) {
      next(error)
    }
  }
}

export default DataController
