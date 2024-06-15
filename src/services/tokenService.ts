import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { User } from '../entity/User';
import { Token } from '../entity/Token';
import { AppDataSource } from '../config/data-sources';

export class TokenService {
  /**
   * Create access and refresh tokens for a user.
   * @param {User} payload - The user data to include in the token payload
   * @returns {Object} The access token and refresh token
   */
  public static createTokens(payload: User): { accessToken: string, refreshToken: string } {
    const SECRET_KEY = process.env.SECRET_KEY; // обязательно поменять на продакшене
    const accessToken = jwt.sign(payload, SECRET_KEY as string, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, SECRET_KEY as string, { expiresIn: '30d' });
    return { accessToken, refreshToken };
  }

  /**
   * Save or update a refresh token for a user.
   * @param {number} userId - The ID of the user
   * @param {string} refreshToken - The refresh token to save
   * @returns {Promise<Token>} The saved token entity
   */
  public static async saveToken(userId: number, refreshToken: string): Promise<Token> {
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
}
