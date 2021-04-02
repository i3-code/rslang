import { createSlice } from '@reduxjs/toolkit';

import saveState from '../functions/saveState';

const saveName = 'app';
const initialState = localStorage.getItem(saveName)
  ? JSON.parse(localStorage.getItem(saveName))
  : {
      deletedWords: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
      },
      hardWords: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
      },
    };

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDeletedWords: (state, action) => {
      const { groupNum, pageNum, id } = action.payload;
      const newState = { ...state };
      if (!newState.deletedWords[groupNum][pageNum]) newState.deletedWords[groupNum][pageNum] = [];
      const wordsArray = newState.deletedWords[groupNum][pageNum];
      if (!wordsArray.includes(id)) wordsArray.push(id);
      saveState(saveName, newState);
    },
    setHardWords: (state, action) => {
      const { groupNum, pageNum, id } = action.payload;
      console.log(action.payload);
      const newState = { ...state };
      if (!newState.hardWords[groupNum][pageNum]) newState.hardWords[groupNum][pageNum] = [];
      const wordsArray = newState.hardWords[groupNum][pageNum];
      if (!wordsArray.includes(id)) wordsArray.push(id);
      saveState(saveName, newState);
    },
  },
});

export const { setDeletedWords, setHardWords } = appSlice.actions;

export const deletedWords = (state) => state.app.deletedWords;
export const hardWords = (state) => state.app.hardWords;

export default appSlice.reducer;
