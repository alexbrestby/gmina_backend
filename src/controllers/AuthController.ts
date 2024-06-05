import { Context } from 'koa';
import { UserBody } from '../types/userInterfaces';
import { UserService } from '../services/userService';

export class AuthController {

  public static async login(ctx: Context) {

  }

  public static async register(ctx: Context) {
    try {
      const body = ctx.request.body as UserBody;
      const userData = await UserService.register({ ...body });
      ctx.cookies.set('refresh-token', userData.refreshToken, {
        httpOnly: true, // false для тестирования, true для продакшена
        maxAge: 30 * 24 * 60 * 60 * 1000 // 10 дней в миллисекундах
      });
    } catch (error) {

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
