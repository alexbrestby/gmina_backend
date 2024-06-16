import { Context } from 'koa';
import { UserBody } from '../types/userInterfaces';
import { UserService } from '../services/userService';

export class AuthController {
  /**
   * Handle user login
   * @param {Context} ctx - The Koa request/response context object
   * @returns {Promise<void>}
   */
  public static async login(ctx: Context): Promise<void> {
    // Implementation here
  }

  /**
   * Handle user registration
   * @param {Context} ctx - The Koa request/response context object
   * @returns {Promise<void>}
   */
  public static async register(ctx: Context): Promise<void> {
    const body = ctx.request.body as UserBody;
    try {
      const userData = await UserService.register({ ...body });
      if (userData) {
        ctx.cookies.set('refresh-token', userData.tokens.refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        ctx.body = {
          message: 'User registration success',
          refreshToken: userData.tokens.refreshToken
        };
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes(body.email)) {
          ctx.status = 409; // Conflict
          ctx.body = {
            message: error.message
          };
        } else {
          ctx.throw(500, 'User registration failed');
        };
      }
    }
  }

  /**
   * Handle user logout
   * @param {Context} ctx - The Koa request/response context object
   * @returns {Promise<void>}
   */
  public static async logout(ctx: Context): Promise<void> {
    try {
      // Implementation here
    } catch (error) {
      // Handle error
    }
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
      ctx.body = { message: `Пользователь c email: ${user.email} успешно активирован` };
    }
  }
  /**
   * Handle refresh token
   * @param {Context} ctx - The Koa request/response context object
   * @returns {Promise<void>}
   */
  public static async refresh(ctx: Context): Promise<void> {
    try {
      // Implementation here
    } catch (error) {
      // Handle error
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

// Экспортируем AuthController
export default AuthController;
