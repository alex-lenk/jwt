import { makeAutoObservable } from 'mobx';
import { signIn, signUp } from './apiServices';

class UserStore {
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  async login(userCredentials: object) {
    const user = await signIn(userCredentials);
    this.user = user.data;
  }

  async register(userCredentials: object) {
    const user = await signUp(userCredentials);
    this.user = user.data;
  }
}

export default new UserStore();
