import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { User } from '../entity/User';
import { Token } from '../entity/Token';
import { AppDataSource } from '../config/data-sources';

export class TokenService {

  public static validateToken(token: string, key: string) {
    try {
      const userData = jwt.verify(token, key);
      return userData;
    } catch (error) {
      return null;
    }
  }

  public static async findTokenInDB(token: string) {
    try {
      const tokenRepository = AppDataSource.getRepository(Token);
      const tokenInDB = await tokenRepository.findOne({ where: { refreshToken: token } });
      return tokenInDB;
    } catch (error) {
      return null;
    }
  }

  /**
   * Create access and refresh tokens for a user.
   * @param {User} payload - The user data to include in the token payload
   * @returns {Object} The access token and refresh token
   */
  public static createTokens(payload: User): { accessToken: string, refreshToken: string } {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY as string, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY as string, { expiresIn: '30d' });
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

  /**
 * Delete tokens for a user.
 * @param {string} refreshToken - The refresh token to save
 * @returns {Promise<Token>} The saved token entity
 */
  public static async deleteToken(refreshToken: string): Promise<Token> {
    const tokenRepository = AppDataSource.getRepository(Token);
    const entity = await tokenRepository.findOne({ where: { refreshToken } });
    if (entity) {
      await tokenRepository.remove(entity);
    }
    return entity as Token;
  }
}


