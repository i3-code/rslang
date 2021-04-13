import urls from '../constants/urls';
import { setDeletedWords, setHardWords, setLearnedWords } from '../redux/appSlice';
import { RequestService } from './request.service';
import store from '../app/store';

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

  static getUserWords = async (params = {}) => {
    try {
      const result = await RequestService.get(urls.aggregatedWords.all, {
        ...params,
        filter: '{"$nor":[{"userWord":null}]}',
      });

      result.data[0].paginatedResults.forEach((word) => {
        if (word.userWord?.difficulty === 'hard') {
          store.dispatch(setHardWords({ groupNum: word.group, pageNum: word.page, id: word._id }));
        }
        if (word.userWord?.optional?.fail || word.userWord?.optional?.success) {
          store.dispatch(setLearnedWords({ groupNum: word.group, pageNum: word.page, id: word._id }));
        }
        if (word.userWord?.optional?.deleted) {
          store.dispatch(setDeletedWords({ groupNum: word.group, pageNum: word.page, id: word._id }));
        }
      });
      return result;
    } catch (err) {
      return [];
    }
  };

  static getUserWord = async (wordId) => {
    try {
      const result = await RequestService.get(urls.aggregatedWords.byId(wordId), {
        filter: '{"$nor":[{"userWord":null}]}',
      });
      return result.data[0].userWord ? result.data[0] : null;
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
      const existWord = await WordsService.getUserWord(wordId);
      if (existWord) {
        return RequestService.put(urls.words.byId(wordId), { difficulty });
      }
      return RequestService.post(urls.words.byId(wordId), word);
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
      const existWord = await WordsService.getUserWord(wordId);
      if (existWord) {
        return RequestService.put(urls.words.byId(wordId), { difficulty });
      }
      return RequestService.post(urls.words.byId(wordId), word);
    } catch (err) {
      return [];
    }
  };

  static deleteUserWord = async (wordId, deleted = true) => {
    const word = {
      ...WORD,
      optional: {
        ...WORD.optional,
        deleted,
      },
    };
    try {
      const existWord = await WordsService.getUserWord(wordId);
      if (existWord) {
        return RequestService.put(urls.words.byId(wordId), {
          ...existWord.userWord,
          optional: { ...existWord.userWord.optional, deleted },
        });
      }
      return RequestService.post(urls.words.byId(wordId), word);
    } catch (err) {
      return [];
    }
  };

  static addWordStat = async (wordId, stat) => {
    try {
      const existWord = await WordsService.getUserWord(wordId);
      if (existWord) {
        return RequestService.put(urls.words.byId(wordId), {
          ...existWord.userWord,
          optional: { ...existWord.userWord.optional, [stat]: existWord.userWord.optional[stat] + 1 },
        });
      } else {
        return RequestService.post(urls.words.byId(wordId), {
          optional: { ...WORD.optional, [stat]: 1 },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
}
