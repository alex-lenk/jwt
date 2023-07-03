import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import type { IUser } from '../models/IUser';
import { API_URL } from '../http';
import AuthService from '../services/AuthService';
import type { AuthResponse } from '../models/response/AuthResponse';
import { getFromStorage, removeFromStorage, saveToStorage } from '../helpers/storage';
import { toast } from 'react-toastify';

class NetworkStore {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;
  users: IUser[] = [];
  menuIsActive = false;
  tokens = {};

  constructor() {
    makeAutoObservable(this);
    //this.checkAuth();
  }

  loginInProgress = false;
  loginError = '';

  toggleMenu() {
    this.menuIsActive = !this.menuIsActive;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

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

  async registration(userCredentials: object) {
    try {
      const response = await AuthService.registration(userCredentials);
      this.setUser(response.data.user);
      this.tokens = response.data.tokens;
      toast.success('Пользователь успешно зарегистрирован');
    } catch (e: any) {
      console.error(e);
      const errorMessage = e?.response?.data?.message || e?.message || 'Произошла неизвестная ошибка';
      console.log(errorMessage);
      toast.error('Пользователь существует');
      throw e;
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
        saveToStorage('token', response.data.accessToken);
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
