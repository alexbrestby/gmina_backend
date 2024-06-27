import Koa from 'koa';
import 'reflect-metadata';
import cors from '@koa/cors';
import cookie from 'koa-cookie';
import bodyParser from 'koa-bodyparser';
import authRoutes from './routes/authRoutes';
import indexRoutes from './routes/indexRoutes';
import { AppDataSource } from './config/data-sources';
import errorHandler from './middlewares/errorHandler';

const app = new Koa();

/**
 * Initialize and start the Koa server.
 * Connect to the database and set up middleware and routes.
 * @async
 * @function
 */
const initializeServer = async () => {
  try {
    // Initialize the database connection
    await AppDataSource.initialize();
    console.log('Database connected');


    // Set up CORS middleware
    app.use(cors({
      allowMethods: 'GET',
      origin: 'http://localhost:5173',
      credentials: true,
    }));

    // Set up body parser middleware
    app.use(bodyParser());

    // Set up cookie middleware
    app.use(cookie());

    // Set up custom error handler
    app.use(errorHandler)

    // Set up routes
    app.use(indexRoutes.routes()).use(indexRoutes.allowedMethods());
    app.use(authRoutes.routes()).use(authRoutes.allowedMethods());

  } catch (error) {
    // Handle database connection errors
    console.log('TypeORM connection error: ', error);
    process.exit(1);
  }
};

// Initialize the server
initializeServer();

export default app;

