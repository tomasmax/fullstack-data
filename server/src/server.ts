import App from '@/app'
import IndexRoute from '@routes/index.route'
import DataRoute from './routes/data.route'

const app = new App([new IndexRoute(), new DataRoute()])

const server = app.listen()
app.onExit(server)
