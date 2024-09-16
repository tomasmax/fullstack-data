import { Router } from 'express'
import { Routes } from '@interfaces/routes.interface'
import DataController from '@controllers/data.controller'

class DataRoute implements Routes {
  public path = '/data'
  public router = Router()
  public dataController = new DataController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.dataController.getData)
  }
}

export default DataRoute
