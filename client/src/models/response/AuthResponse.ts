import type { IUser } from '../IUser';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokens: { accessToken: string; refreshToken: string };
  user: IUser;
}
