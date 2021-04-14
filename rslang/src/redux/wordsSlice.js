import { createSlice } from '@reduxjs/toolkit';
import saveState from '../functions/saveState';

const defaultWordState = {
  correct: 0,
  wrong: 0,
};

const saveName = 'words';
const initialState = localStorage.getItem(saveName) ? JSON.parse(localStorage.getItem(saveName)) : {};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setWords: (state, action) => {
      const { word, target, amount } = action.payload;
      if (!state[word]) state[word] = { ...defaultWordState };
      state[word][target] += amount;
      saveState(saveName, state);
    },
  },
});

export const { setWords } = wordsSlice.actions;
export const getWords = (state) => state.words;
export default wordsSlice.reducer;
