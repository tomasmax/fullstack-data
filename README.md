# README

This project is a full-stack application built with Node.js, TypeScript, Express, React, and Vite. It is designed to provide a robust and scalable backend service for handling various data operations and a modern frontend for interacting with the data. The application fetches data from a remote endpoint and transforms it to handle filtering and pagination. It also includes a caching system to optimize performance.

## Structure

The application is structured into two main parts:

### Server

The server-side application is structured as follows:

- **Controllers**: These handle incoming HTTP requests and send responses. See [`IndexController`](server/src/controllers/index.controller.ts) and [`DataController`](server/src/controllers/data.controller.ts).

- **Services**: These contain the business logic of the application. See [`DataService`](server/src/services/data.service.ts) and [`CacheService`](server/src/services/cache.service.ts).

- **Routes**: These define the application's endpoints. See [`IndexRoute`](server/src/routes/index.route.ts) and [`DataRoute`](server/src/routes/data.route.ts).

- **Middlewares**: These handle error processing and other intermediate functions. See [`errorMiddleware`](server/src/middlewares/error.middleware.ts).

- **Models**: These define the structure of the data. See [`DataModel`](server/src/models/data.model.ts) and [`DataList`](server/src/models/dataList.model.ts).

### Web

The client-side application is structured as follows:

- **Components**: These are the building blocks of the UI

- **Containers**: These manage the state and logic of the Paginated and filtered data table. See [`PaginatedTableContainer`](web/src/containers/PaginatedTableContainer/PaginatedTableContainer.tsx).

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Running the Application

#### Server

1. Navigate to the `server` directory:

   ```sh
   cd server
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Run the server in development mode (watches for any file changes):

   ```sh
   npm run dev
   ```

4. The server will be running at http://localhost:3000/ or http://localhost:3000/data.

5. To build and run the server from the `dist` directory:
   ```sh
   npm run start
   ```

**To run tests:**

1. After dependencies are installed, run tests:

   ```sh
   npm run test
   ```

2. Run tests watching for changes:
   ```sh
   npm run test:watch
   ```

#### Web

1. Navigate to the `web` directory:

   ```sh
   cd web
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Run the web application in development mode:

   ```sh
   npm run dev
   ```

4. The web application will be running at http://localhost:5173/.

5. To build the web application:

   ```sh
   npm run build
   ```

6. To preview the built web application:
   ```sh
   npm run preview
   ```

**To run tests:**

1. After dependencies are installed, run tests:

   ```sh
   npm run test
   ```

2. Run tests with coverage:
   ```sh
   npm run test:coverage
   ```

## Design Decisions, Trade-offs, and Assumptions

### Design Decisions

- The application uses TypeScript for type safety and better developer experience.
- Express is used for the backend to handle HTTP requests and responses.
- React is used for the frontend to build a dynamic and responsive user interface.
- Vite is used as the build tool for the frontend for faster development and build times.
- Axios is used for making HTTP requests from both the server and the client.
- A caching system is implemented on the server to optimize performance by reducing the number of requests to the remote endpoint.

### Trade-offs

- Using TypeScript adds a learning curve for developers not familiar with it, but it provides better type safety and code quality.
- Implementing a caching system adds complexity to the server-side code but significantly improves performance.

## Conclusion

This project provides a robust and scalable solution for handling data operations with a modern frontend for interacting with the data. By following the instructions above, you can set up and run the application locally for development and testing purposes.
