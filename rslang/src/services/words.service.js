import urls from '../constants/urls';
import { RequestService } from './request.service';

export class WordsService {  
  static getAll = async (params = {group: 0, page: 0, wordsPerPage: 50}) => {
    try {      
      const result = await RequestService.get(urls.aggregatedWords.all, params);
      return result;
    } catch (err) {
      return [];
    }
  };

  static getUserWords = async (params = {group: 0, page: 0, wordsPerPage: 50}) => {
    try {      
      const result = await RequestService.get(urls.aggregatedWords.all, {...params, filter: '{"$nor":[{"userWord":null}]}'});
      return result;
    } catch (err) {
      return [];
    }
  };

  static addUserWord = async (wordId, word) => {
    try {      
      const result = await RequestService.post(urls.words.byId(wordId), word);
      return result;
    } catch (err) {
      return [];
    }
  };
}