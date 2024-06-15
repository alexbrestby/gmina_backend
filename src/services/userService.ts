import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/data-sources';
import { User } from '../entity/User';
import { UserBody } from '../types/userInterfaces';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../services/mailService';
import { TokenService } from '../services/tokenService';
import { UserDto } from '../dtos/UserDto';

export class UserService {
  public static async register({ email, password, username }: UserBody) {

    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error(`Пользователь с адресом почты ${email} уже существует`);
    }
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const activation_link = uuidv4();

    const user = userRepository.create(
      {
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

  public static async activate(activationLink: string) {
    const userRepository = AppDataSource.getRepository(User);
    const isActivatedUser = await userRepository.findOne({ where: { is_active: true, activation_link: activationLink } });

    if (isActivatedUser) {
      throw new Error(`Пользователь c email: ${isActivatedUser.email} уже активирован`);
    } else {
      const user = await userRepository.findOne({ where: { activation_link: activationLink } });
      if (!user) {
        throw new Error('Некорректная ссылка активации ');
      }
      user.is_active = true;
      await userRepository.save(user);
      return user;
    }
  }

  public static async getAllUsers() {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find({ relations: ['tokens'] });
    return users;
  }
}
