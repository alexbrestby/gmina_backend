import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/data-sources';
import { Token } from '../entity/Token';
import { User } from '../entity/User';

export class TokenService {

  public static createTokens(payload: User) {

    const SECRET_KEY_ = process.env.SECRET_KEY;  //обязательно поменять на продакшене
    const accessToken = jwt.sign(payload, SECRET_KEY_ as string, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, SECRET_KEY_ as string, { expiresIn: '30d' });
    return { accessToken, refreshToken };
  };

  public static async saveToken(userId: number, refreshToken: string) {
    const tokenRepository = AppDataSource.getRepository(Token);

    let tokenData = await tokenRepository.findOne({ where: { userId } });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
    } else {
      tokenData = tokenRepository.create({
        userId,
        refreshToken
      });
    }
    await tokenRepository.save(tokenData);
    return tokenData;
  }
};
