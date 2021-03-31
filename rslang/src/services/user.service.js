import urls from '../constants/urls';
import { RequestService } from './request.service';

export class UserService {
  static getWinStreak = async () => {
    try {
      const result = await RequestService.get(urls.user.statistics);
      return result.data?.optional?.winStreak || 0;
    } catch (err) {
      return 0;
    }
  };

  static setWinStreak = async (winStreak) => {
    try {
      await RequestService.put(urls.user.statistics, { optional: { winStreak } });
    } catch (err) {
      return 0;
    }
  };
}
