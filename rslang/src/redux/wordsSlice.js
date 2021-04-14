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
      const { id, target, amount } = action.payload;
      const newState = { ...state };
      if (!newState[id]) newState[id] = { ...defaultWordState };
      newState[id][target] += amount;
      saveState(saveName, newState);
    },
  },
});

export const { setWords } = wordsSlice.actions;
export const getWords = (state) => state.words;
export default wordsSlice.reducer;
