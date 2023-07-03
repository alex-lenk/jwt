import type { AxiosResponse } from 'axios';
import type { AuthResponse } from '../models/response/AuthResponse';
import $api from '../http';

export default class AuthService {
  static async login(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', { email, password });
  }

  static async refresh(
    withCredentials: object,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.get<AuthResponse>('/refresh', withCredentials);
  }

  static async registration(userCredentials: object): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/register', userCredentials);
  }

  static async logout(): Promise<void> {
    return $api.post('/logout');
  }
}
