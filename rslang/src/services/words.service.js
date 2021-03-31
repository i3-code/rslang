import urls from '../constants/urls';
import { RequestService } from './request.service';

export const WORD_STATS = {
  FAIL: 'fail',
  SUCCESS: 'success',
};

const WORD = {
  optional: {
    fail: 0,
    success: 0,
  },
};

export class WordsService {
  static getAll = async (params = { group: 0, page: 0, wordsPerPage: 50 }) => {
    try {
      const result = await RequestService.get(urls.aggregatedWords.all, params);
      return result;
    } catch (err) {
      return [];
    }
  };

  static getUserWords = async (params = { group: 0, page: 0, wordsPerPage: 50 }) => {
    try {
      const result = await RequestService.get(urls.aggregatedWords.all, {
        ...params,
        filter: '{"$nor":[{"userWord":null}]}',
      });
      return result;
    } catch (err) {
      return [];
    }
  };

  static addUserWord = async (wordId, difficulty) => {
    const word = {
      ...WORD,
      difficulty,
    };
    try {
      const result = await RequestService.post(urls.words.byId(wordId), word);
      return result;
    } catch (err) {
      return [];
    }
  };

  static addWordStat = async (wordId, stat) => {
    try {
      let word = (await RequestService.get(urls.aggregatedWords.byId(wordId))).data[0];
      if (!word.userWord) {
        word = (await WordsService.addUserWord(wordId, 'easy')).data;
      }
      const { userWord } = word;
      const newUserWord = {...userWord, optional: {...userWord.optional, [stat]: userWord.optional[stat] + 1}}
      await RequestService.put(urls.words.byId(wordId), newUserWord)
    } catch (err) {
      console.log(err);
    }
  };
}
