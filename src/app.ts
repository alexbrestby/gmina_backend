import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import indexRoutes from './routes/index';

const app = new Koa();

app.use(bodyParser());

app.use(indexRoutes.routes()).use(indexRoutes.allowedMethods());

export default app;