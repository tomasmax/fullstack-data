# TS-Node-Express Paginated data

This project is a Node.js application built with TypeScript, Express, and other modern tools. It is designed to provide a robust and scalable backend service for handling various data operations. Fetching data from a remote endpoint and transforming it to handle filtering and pagination. It has a caching system to optimize the performance.

## Structure

The application is structured like this:

- **Controllers**: These handle incoming HTTP requests and send responses. See [`IndexController`](src/controllers/index.controller.ts) and [`DataController`](src/controllers/data.controller.ts).

- **Services**: These contain the business logic of the application. See [`DataService`](src/services/data.service.ts) and [`CacheService`](src/services/cache.service.ts).

- **Routes**: These define the application's endpoints. See [`IndexRoute`](src/routes/index.route.ts) and [`DataRoute`](src/routes/data.route.ts).

- **Middlewares**: These handle error processing and other intermediate functions. See [`errorMiddleware`](src/middlewares/error.middleware.ts).

- **Models**: These define the structure of the data. See [`DataModel`](src/models/data.model.ts) and [`DataList`](src/models/dataList.model.ts).

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Running the Application

#### Development

- Install dependencies `npm install`
- Run for dev (watches for any files changes) `npm run dev`
- Go to http://localhost:3000/ or http://localhost:3000/data
- Run build from dist `npm run start`

**To run tests**

- After dependencies are installed
- Run tests `npm run test`
- Run tests watching for changes `npm run test:watch`

## Design Decisions, Trade-offs, and Assumptions

### Design Decisions
