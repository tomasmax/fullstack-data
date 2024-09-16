import cors from 'cors'
import express from 'express'
import { NODE_ENV, PORT, ORIGIN, CREDENTIALS } from '@config'
import { Routes } from '@interfaces/routes.interface'
import errorMiddleware from '@middlewares/error.middleware'

class App {
  public app: express.Application
  public env: string
  public port: string | number

  constructor(routes: Routes[]) {
    this.app = express()
    this.env = NODE_ENV || 'development'
    this.port = PORT || 3000

    this.initializeMiddlewares()
    this.initializeRoutes(routes)
    this.initializeErrorHandling()
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router)
    })
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }

  private handleExit(server) {
    server.close()
  }

  private handleSignal(signal: NodeJS.Signals, server) {
    console.info(`Received ${signal}, performing cleanup...`)
    console.info(`=================================`)
    console.info(`======= ENV: ${this.env} =======`)
    console.info(`🚀 App closed on the port ${this.port}`)
    console.info(`=================================`)
    this.handleExit(server)
  }

  public listen() {
    return this.app.listen(this.port, () => {
      console.info(`=================================`)
      console.info(`======= ENV: ${this.env} =======`)
      console.info(`🚀 App listening on the port ${this.port}`)
      console.info(`=================================`)
    })
  }

  public getServer() {
    return this.app
  }

  public onExit(server) {
    process.on('exit', this.handleExit.bind(this))
    process.on('SIGINT', this.handleSignal.bind(this, 'SIGINT', server))
    process.on('SIGTERM', this.handleSignal.bind(this, 'SIGTERM', server))
  }
}

export default App
