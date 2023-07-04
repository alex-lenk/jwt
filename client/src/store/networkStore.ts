import { makeAutoObservable } from 'mobx';
import type { IUser } from '../models/IUser';
import { getUserInfo, loginUser, registerUser } from '../services/AuthService';

class NetworkStore {
  user = {} as IUser;
  isAuth = false;
  users: IUser[] = [];
  menuIsActive = false;
  tokens: { accessToken: string; refreshToken: string } | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  toggleMenu() {
    this.menuIsActive = !this.menuIsActive;
  }

  async register(userCredentials: object) {
    const data = await registerUser(userCredentials);
    this.user = data.user;
    this.tokens = data.tokens;
  }

  async login(email: string, password: string) {
    const data = await loginUser(email, password);
    this.user = data.user;
    this.tokens = data.tokens;
  }

  async fetchUserInfo() {
    if (!this.tokens) return;
    const data = await getUserInfo(this.tokens.accessToken);
    this.user = data.user;
  }
}

export default NetworkStore;
