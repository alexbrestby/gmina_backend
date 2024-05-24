// src/app.ts
import 'reflect-metadata';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { AppDataSource } from './config/data-sources';
import indexRoutes from './routes/indexRoutes';
import userRoutes from './routes/userRoutes';

const app = new Koa();

const initializeServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');

    // Использование bodyParser для обработки JSON запросов
    app.use(bodyParser());

    // Использование маршрутов
    app.use(indexRoutes.routes()).use(indexRoutes.allowedMethods());
    app.use(userRoutes.routes()).use(userRoutes.allowedMethods());

  } catch (error) {
    console.log('TypeORM connection error: ', error);
    process.exit(1); // Остановить процесс, если подключение к базе данных не удалось
  }
};

initializeServer();

export default app;

