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

- **Components**: These are the building blocks of the UI.

- **Containers**: These manage the state and logic of the paginated and filtered data table. See [`PaginatedTableContainer`](web/src/containers/PaginatedTableContainer/PaginatedTableContainer.tsx).

- **Hooks**: Custom hooks to encapsulate reusable logic. See [`useFetch`](web/src/hooks/useFetch.tsx).

#### Custom `useFetch` Hook

The `useFetch` hook is a custom hook designed to handle data fetching with support for loading and error states. It uses `axiosInstance` to make HTTP requests and manages the request lifecycle, including cancellation on component unmount. This hook simplifies data fetching in components and ensures a consistent approach across the application.

#### CLS Improvements

To improve Cumulative Layout Shift (CLS) in the web application, several strategies have been implemented:

- **Loading skeleton spinner**: Placeholder skeleton spinner are used to provide a visual loading indication.
- **Fixed Layouts**: Explicit widths and heights are set for table cells to ensure a stable and predictable layout.
- **Font Loading**: The `font-display: swap` property is used to ensure that fallback fonts are displayed immediately, and custom fonts are swapped in once they are loaded. Additionally, fonts are preloaded to ensure they are loaded as quickly as possible.

<img width="363" alt="Captura de pantalla 2025-02-25 a las 15 51 42" src="https://github.com/user-attachments/assets/5fe8e92a-a264-4e77-b3ec-bea50ec35747" />

#### React Strict Mode

In development mode, React Strict Mode is enabled, which intentionally double-invokes certain lifecycle methods and effects to help identify potential issues. This can result in components making two requests during development, but this behavior does not occur in production. You can try it on you own building and executing server and web with the following commands:

```sh
npm run start
```

```sh
npm run preview
```

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
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
  - Not cached request time: <img width="912" alt="Captura de pantalla 2025-02-25 a las 13 50 20" src="https://github.com/user-attachments/assets/62046c44-d27e-487e-8447-843a02fe3f5d" />
  - Cached request time: <img width="907" alt="Captura de pantalla 2025-02-25 a las 13 50 37" src="https://github.com/user-attachments/assets/032f903d-c146-47cf-a2ae-7c98a3ad64b5" />

### Trade-offs

- Using TypeScript adds a learning curve for developers not familiar with it, but it provides better type safety and code quality.
- Implementing a caching system adds complexity to the server-side code but significantly improves performance.

## Conclusion

This project provides a robust and scalable solution for handling data operations with a modern frontend for interacting with the data. By following the instructions above, you can set up and run the application locally for development and testing purposes.
