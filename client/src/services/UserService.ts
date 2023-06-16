import { IUser } from '../models/IUser';
// import { AuthResponse } from '../models/response/AuthResponse';
import $api from '../http';
import { AxiosResponse } from 'axios';

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users');
  }
}
