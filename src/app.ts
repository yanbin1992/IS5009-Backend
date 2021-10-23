import express from 'express';
import 'reflect-metadata';
// import bodyParser from 'body-parser';
// import swaggerJsdoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';

import { mountErrorHandlers } from 'config/errorHandlers';
import { mountMiddlewares } from 'config/middlewares';
import { mountRoutes } from 'config/routes';

const app = express();

mountMiddlewares(app);
mountRoutes(app);
mountErrorHandlers(app);

// console.log('>>>', app);
// const options = {
//     definition: {
//       openapi: "3.0.0",
//       info: {
//         title: "LogRocket Express API with Swagger",
//         version: "0.1.0",
//         description:
//           "This is a simple CRUD API application made with Express and documented with Swagger",
//         license: {
//           name: "MIT",
//           url: "https://spdx.org/licenses/MIT.html",
//         },
//         contact: {
//           name: "LogRocket",
//           url: "https://logrocket.com",
//           email: "info@email.com",
//         },
//       },
//       servers: [
//         {
//           url: "http://localhost:3002/books",
//         },
//       ],
//     },
//     apis: ["./routes/books.js"],
//   };

//   const specs = swaggerJsdoc(options);
//   app.use(
//     "/api-docs",
//     swaggerUi.serve,
//     swaggerUi.setup(specs)
//   );

export default app;
