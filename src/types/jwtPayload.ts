export interface JwtPayload {
  userId: number;
  deviceId: string;
  accessToken: string;
  refreshToken: string;
}

