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
      learnedWords: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
      },
    };

const reducerFunc = (array, state, action) => {
  const { groupNum, pageNum, id } = action.payload;
  const newState = { ...state };
  if (!newState[array][groupNum][pageNum]) newState[array][groupNum][pageNum] = [];
  const wordsArray = newState[array][groupNum][pageNum];
  if (!wordsArray.includes(id)) wordsArray.push(id);
  saveState(saveName, newState);
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDeletedWords: (state, action) => reducerFunc('deletedWords', state, action),
    setHardWords: (state, action) => reducerFunc('hardWords', state, action),
    setLearnedWords: (state, action) => reducerFunc('learnedWords', state, action),
  },
});

export const { setDeletedWords, setHardWords, setLearnedWords } = appSlice.actions;

export const deletedWords = (state) => state.app.deletedWords;
export const hardWords = (state) => state.app.hardWords;

export default appSlice.reducer;
