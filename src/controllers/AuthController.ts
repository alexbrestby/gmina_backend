import { Context } from 'koa';
import { UserBody } from '../types/userInterfaces';
import { UserService } from '../services/userService';

export class AuthController {

  public static async login(ctx: Context) {

  }

  public static async register(ctx: Context) {
    const body = ctx.request.body as UserBody;
    try {
      const userData = await UserService.register({ ...body });
      if (userData) {
        ctx.cookies.set('refresh-token', userData.tokens.refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000, 
        });
        ctx.body = {
          message: `Пользователь успешно создан`,
          refreshToken: userData.tokens.refreshToken
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes(body.email)) {
          ctx.status = 409; // Conflict
          ctx.body = {
            message: error.message
          };
        } else {
          ctx.status = 500; // Internal Server Error
          ctx.body = {
            message: 'Internal server error'
          };
        }
      } else {
        ctx.status = 500; // Internal Server Error for unknown error type
        ctx.body = {
          message: 'An unknown error occurred'
        };
      }
    }
  }

  public static async logout(ctx: Context) {
    try {

    } catch (error) {

    }
  }

  public static async activate(ctx: Context) {
    try {

    } catch (error) {

    }
  }

  public static async refresh(ctx: Context) {
    try {

    } catch (error) {

    }
  }

  public static async getAllUsers(ctx: Context) {
    try {
      const userData = await UserService.getAllUsers();
      ctx.status = 200;
      ctx.body = {
        status: '200',
        message: userData
      }
    } catch (error) {

    }
  }
}
