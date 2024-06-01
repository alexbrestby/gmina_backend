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
      console.log(`userData_AuthContorller ${userData.refreshToken}`);
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
      ctx.status = 200;
      ctx.body = {
        status: '200',
        message: 'hello world'
      }
    } catch (error) {

    }
  }
}
