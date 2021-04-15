import axios from 'axios';
import urls from '../constants/urls';
import { cleanState } from '../redux/appSlice';
import store from '../app/store'
import { WordsService } from './words.service';
import { cleanWords } from '../redux/wordsSlice';

export class AuthService {
  static checkAuthorization = () => {
    try {
      if (localStorage.getItem('token') && localStorage.getItem('rememberMe')) {
        return AuthService.whoAmI();
      }
    } catch (err) {
      return err;
    }
  };

  static signUp = async (userData) => {
    try {
      await axios.post(urls.auth.signup, userData);
      return AuthService.signIn({ email: userData.email, password: userData.password });
    } catch (err) {
      return err;
    }
  };

  static signIn = async (userData) => {
    try {
      const result = await axios.post(urls.auth.login, userData);
      localStorage.setItem('token', result.data.token);
      return AuthService.whoAmI();
    } catch (err) {
      return err;
    }
  };

  static whoAmI = async () => {
    try {
      const token = localStorage.getItem('token');
      const result = await axios.get(urls.auth.whoAmI, {
        headers: { Authorization: `Bearer ${token}` },
      });
      WordsService.getUserWords();
      return result;
    } catch (err) {
      return err;
    }
  };

  static logout = () => {
    localStorage.removeItem('token');
    store.dispatch(cleanState());
    store.dispatch(cleanWords());
  };

  static setRememberMe = (value) => {
    if (value) {
      localStorage.setItem('rememberMe', value);
    } else {
      localStorage.removeItem('rememberMe');
    }
  };
}
