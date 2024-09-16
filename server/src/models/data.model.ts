import { Data } from '@/interfaces/data.interface'

class DataModel implements Data {
  id: number
  status: string
  createdOn?: Date
  name: string
  description?: string
  delta?: number | string

  constructor(data: Data) {
    DataModel.validateData(data)

    this.id = data.id
    this.status = data.status
    this.createdOn = data.createdOn ? new Date(data.createdOn) : undefined
    this.name = data.name
    this.description = data.description
    this.delta = data.delta
  }

  static isData(obj: any): obj is Data {
    return (
      typeof obj.id === 'number' &&
      typeof obj.status === 'string' &&
      (typeof obj.createdOn === 'undefined' || typeof obj.createdOn === 'string' || typeof obj.createdOn === 'number') &&
      typeof obj.name === 'string' &&
      (typeof obj.description === 'undefined' || typeof obj.description === 'string') &&
      (typeof obj.delta === 'undefined' || typeof obj.delta === 'number' || typeof obj.delta === 'string')
    )
  }

  static validateData(data: Data): void {
    if (!DataModel.isData(data)) {
      throw new Error('[DataModel]: Invalid data')
    }
  }
}

export default DataModel
