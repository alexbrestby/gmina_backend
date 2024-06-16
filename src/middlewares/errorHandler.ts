import { Context, Next } from 'koa';

/**
 * Global error handling middleware for Koa.
 * 
 * This middleware intercepts any errors thrown during the processing of requests and
 * responds with a JSON object containing the error message and appropriate HTTP status code.
 * 
 * @param {Context} ctx - Koa Context object which provides information about the request and response.
 * @param {Next} next - Function to pass control to the next middleware.
 * @returns {Promise<void>} A promise that resolves to void.
 * 
 * @example
 * // Usage in Koa application
 * import Koa from 'koa';
 * import errorHandler from './middlewares/errorHandler';
 * 
 * const app = new Koa();
 * app.use(errorHandler);
 */
const errorHandler = async (ctx: Context, next: Next): Promise<void> => {
  try {
    await next();
  } catch (err) {
    const error = err as { statusCode?: number; status?: number; message: string };
    ctx.status = error.statusCode || error.status || 500;
    ctx.body = {
      message: error.message,
    };
  }
};

export default errorHandler;

