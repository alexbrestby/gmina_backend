import { Context, Next } from 'koa';
import { Schema } from 'joi';

/**
 * Middleware to validate the request body against a Joi schema.
 */
export const validateRequestBody = (schema: Schema) => async (ctx: Context, next: Next) => {
  const { error } = schema.validate(ctx.request.body);
  if (error) {
    ctx.status = 400;
    ctx.body = {
      message: error.details[0].message
    };
    return;
  }
  await next();
};

