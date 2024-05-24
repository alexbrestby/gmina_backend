// src/controllers/UserController.ts
import { Context } from 'koa';
import { AppDataSource } from '../config/data-sources';
import { User } from '../models/User';
import { CheckUserRequestBody } from '../types/userInterfaces';

export class UserController {
  public static async checkUser(ctx: Context) {
    const body = ctx.request.body as CheckUserRequestBody;
    const { username } = body;

    const userRepository = AppDataSource.getRepository(User);
    console.log(username);

    try {
      const user = await userRepository.findOne({ where: { username } });

      if (user) {
        ctx.body = {
          status: 'success',
          message: 'User found',
          role: user.role,
        };
      } else {
        ctx.body = {
          status: 'fail',
          message: 'User not found',
        };
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        status: 'error',
        message: 'Internal server error',
      };
    }
  }
}

