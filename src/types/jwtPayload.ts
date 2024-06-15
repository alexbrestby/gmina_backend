/**
 * Interface representing the payload of a JWT.
 * @interface JwtPayload
 * @property {number} userId - The ID of the user
 * @property {string} deviceId - The ID of the device
 * @property {string} accessToken - The access token
 * @property {string} refreshToken - The refresh token
 */
export interface JwtPayload {
  userId: number;
  deviceId: string;
  accessToken: string;
  refreshToken: string;
}
