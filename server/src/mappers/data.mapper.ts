import { Data } from '@/interfaces/data.interface'
import DataModel from '@/models/data.model'

export function mapDataListApiResponseToDataListModel(data: Data[] = []): DataModel[] {
  return data
    .map(item => {
      try {
        return new DataModel(item)
      } catch (error) {
        console.error('Invalid data item:', item, error)
        return null
      }
    })
    .filter(item => item !== null)
}
