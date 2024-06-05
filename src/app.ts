// src/app.ts
import 'reflect-metadata';
import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { AppDataSource } from './config/data-sources';
import indexRoutes from './routes/indexRoutes';
import authRoutes from './routes/authRoutes';
import cookie from 'koa-cookie';

const app = new Koa();

const initializeServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');

    app.use(cors({
      allowMethods: 'GET',
      // origin: 'https://leoniuk.org'
    }));
    app.use(bodyParser());
    app.use(cookie());

    // Использование маршрутов
    app.use(indexRoutes.routes()).use(indexRoutes.allowedMethods());
    app.use(authRoutes.routes()).use(authRoutes.allowedMethods());

  } catch (error) {
    console.log('TypeORM connection error: ', error);
    process.exit(1); // Остановить процесс, если подключение к базе данных не удалось
  }
}; ``

initializeServer();

export default app;

