import { Context } from 'koa';
import { UserBody } from '../types/userInterfaces';
import { UserService } from '../services/userService';
import { TokenService } from '../services/tokenService';

export class AuthController {
  /**
   * Handle user login
   * @param {Context} ctx - The Koa request/response context object
   * @returns {Promise<void>}
   */
  public static async login(ctx: Context): Promise<void> {
    const body = ctx.request.body as UserBody;
    const userData = await UserService.login(ctx, { ...body });
    if (userData) {
      ctx.cookies.set('refresh-token', userData.tokens.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
      ctx.body = {
        message: 'Login successful',
        username: userData.username,
        accessToken: userData.tokens.accessToken,
      };
    }
  }

  /**
   * Handle user registration
   * @param {Context} ctx - The Koa request/response context object
   * @returns {Promise<void>}
   */
  public static async register(ctx: Context): Promise<void> {
    const body = ctx.request.body as UserBody;
    const userData = await UserService.register(ctx, { ...body });
    if (userData) {
      ctx.cookies.set('refresh-token', userData.tokens.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
      ctx.body = {
        message: 'User registration success',
        accessToken: userData.tokens.accessToken
      };
    }
  }

  /**
   * Handle user logout
   * @param {Context} ctx - The Koa request/response context object
   * @returns {Promise<void>}
   */
  public static async logout(ctx: Context): Promise<void> {
    const refreshToken = ctx.cookies.get('refresh-token');
    const token = await UserService.logout(refreshToken as string);
    ctx.cookies.set('refresh-token', null, { expires: new Date(0) });
    ctx.body = { token }
  }

  /**
   * Handle user account activation
   * @param {Context} ctx - The Koa request/response context object
   * @returns {Promise<void>}
   */
  public static async activate(ctx: Context): Promise<void> {
    {
      const activationLink = ctx.params.link;
      const user = await UserService.activate(ctx, activationLink);
      ctx.body = { message: `User with email: ${user.email} activation success` };
    }
  }

  /**
   * Handle refresh token
   * @param {Context} ctx - The Koa request/response context object
   * @returns {Promise<void>}
   */
  public static async refresh(ctx: Context): Promise<void> {
    const refreshToken = ctx.cookies.get('refresh-token');
    const tokens = await UserService.refresh(ctx, refreshToken as string);
    ctx.cookies.set('refresh-token', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    ctx.body = {
      message: 'tokens refresh success',
      tokens,
    }
  }

  /**
   * Get all users
   * @param {Context} ctx - The Koa request/response context object
   * @returns {Promise<void>}
   */
  public static async getAllUsers(ctx: Context): Promise<void> {
    try {
      const userData = await UserService.getAllUsers();
      ctx.status = 200;
      ctx.body = {
        status: '200',
        message: userData
      };
    } catch (error) {
      // Handle error
    }
  }
}

export default AuthController;
