import axios from 'axios';
import { decodeJWT } from '../utils/jwtDecoder';

export class RequestService {
  static get = (url, params = {}) => {
    const token = localStorage.getItem('token');
    const decodedToken = decodeJWT(token);
    const result = axios.get(url(decodedToken.id), {
      headers: { Authorization: `Bearer ${token}` },
      params
    });
    return result;
  };

  static post = (url, body) => {
    const token = localStorage.getItem('token');
    const decodedToken = decodeJWT(token);
    const result = axios.post(url(decodedToken.id), body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result;
  };

  static put = (url, body) => {
    const token = localStorage.getItem('token');
    const decodedToken = decodeJWT(token);
    const result = axios.put(url(decodedToken.id), body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result;
  };
}
