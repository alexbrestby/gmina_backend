import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/data-sources';
import { User } from '../entity/User';
import { UserBody } from '../types/userInterfaces';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../services/mailService';
import { TokenService } from '../services/tokenService';
import { UserDto } from '../dtos/UserDto';
import { JwtPayload } from 'jsonwebtoken';
import { Context } from 'koa';

export class UserService {
  /**
   * Register a new user
   * @param {UserBody} userBody - The user data to register
   * @returns {Promise<{ tokens: JwtPayload, email: string }>The tokens and email of the registered user
   * @throws {Error} If a user with the provided email already exists
   */
  public static async register({ email, password, username }: UserBody): Promise<{ tokens: JwtPayload, email: string }> {
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error(`Пользователь с адресом почты ${email} уже существует`);
    }
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const activation_link = uuidv4();

    const user = userRepository.create({
      username,
      email,
      password: hashedPassword,
      activation_link
    });
    await userRepository.save(user);
    await MailService.sendActivationMail(email, activation_link);

    const userDto = new UserDto(user);
    const tokens = TokenService.createTokens({ ...userDto } as User);
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { tokens, email };
  }

  /**
   * Activate a user account
   * @param {string} activationLink - The activation link
   * @returns {Promise<User>} The activated user
   * @throws {Error} If the user is already activated or the activation link is invalid
   */
  public static async activate(ctx: Context, activationLink: string): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);
    const isActivatedUser = await userRepository.findOne({ where: { is_active: true, activation_link: activationLink } });

    if (isActivatedUser) {
      ctx.throw(409, `User with email: ${isActivatedUser.email} is alredy activated`);
    } else {
      const user = await userRepository.findOne({ where: { activation_link: activationLink } });
      if (!user) {
        ctx.throw(400, 'Incorrect activaiton link');
      }
      user.is_active = true;
      await userRepository.save(user);
      return user;
    }
  }

  /**
   * Get all users
   * @returns {Promise<User[]>} A list of all users
   */
  public static async getAllUsers(): Promise<User[]> {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find({ relations: ['tokens'] });
    return users;
  }
}
