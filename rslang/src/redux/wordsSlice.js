import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_WORD_STAT } from '../constants';
import saveState from '../functions/saveState';

const saveName = 'words';
const initialState = localStorage.getItem(saveName) ? JSON.parse(localStorage.getItem(saveName)) : {};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setWords: (state, action) => {
      const { word, target, amount } = action.payload;
      if (!state[word]) state[word] = { ...DEFAULT_WORD_STAT };
      state[word][target] += amount;
      saveState(saveName, state);
    },
    cleanWords: (state) => {
      saveState(saveName, {});
      return {};
    },
  },
});

export const { setWords, cleanWords } = wordsSlice.actions;
export const getWords = (state) => state.words;
export default wordsSlice.reducer;
