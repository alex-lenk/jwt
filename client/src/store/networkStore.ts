import { makeAutoObservable } from 'mobx';
import { IUser } from '../models/IUser';
import { getFromStorage, removeFromStorage, saveToStorage } from '../helpers/storage';
import AuthService from '../services/AuthService';
import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
import { API_URL } from '../http';

class NetworkStore {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;
  users: IUser[] = [];

  constructor() {
    makeAutoObservable(this);
    this.checkAuth();
    //this.fetchUsers();
  }

  loginInProgress = false;
  loginError = '';

  /*
   setLoading = (isLoading: boolean) => {
     this.isLoading = isLoading;
   }
      */
  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  /*
    async fetchUsers() {
      try {
        const response = await UserService.fetchUsers();
        this.users = response.data;
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    }
  */

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  startLogin() {
    this.loginInProgress = true;
    this.loginError = '';
  }

  loginSuccess(response: any) {
    saveToStorage('token', response.data.accessToken);
    this.setAuth(true);
    this.setUser(response.data.user);
    this.loginInProgress = false;
  }

  loginFailure(error: any) {
    this.loginError = error;
    this.loginInProgress = false;
  }

  async login(email: string, password: string) {
    this.startLogin();
    try {
      const response = await AuthService.login(email, password);
      this.loginSuccess(response);
    } catch (e: any) {
      this.loginFailure(e.response?.data?.message);
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      removeFromStorage('token');
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    if (getFromStorage('token')) {
      this.setLoading(true);
      try {
        const response = await axios.get<AuthResponse>(`${ API_URL }/refresh`, {
          withCredentials: true,
        });
        console.log(response);
        saveToStorage('token', response.data.accessToken); // use saveToStorage here
        this.setAuth(true);
        this.setUser(response.data.user);
      } catch (error: any) {
        console.log(error.response?.data?.message);
      } finally {
        this.setLoading(false);
      }
    }
  }
}

export default NetworkStore;
