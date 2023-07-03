import { makeAutoObservable } from 'mobx';
import { registerUser, loginUser, getUserInfo } from '../services/api';

class UserStore {
  user = null;
  tokens: { accessToken: string; refreshToken: string } | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async login(email: string, password: string) {
    const data = await loginUser(email, password);
    this.user = data.user;
    this.tokens = data.tokens;
  }

  async register(userCredentials: object) {
    const data = await registerUser(userCredentials);
    this.user = data.user;
    this.tokens = data.tokens;
  }

  async fetchUserInfo() {
    if (!this.tokens) return;
    const data = await getUserInfo(this.tokens.accessToken);
    this.user = data.user;
  }
}

export default new UserStore();
