import { createSlice } from '@reduxjs/toolkit';

import saveState from '../functions/saveState';

const defaultWordsState = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
};

const saveName = 'app';
const initialState = localStorage.getItem(saveName)
  ? JSON.parse(localStorage.getItem(saveName))
  : {
      deletedWords: { ...defaultWordsState },
      hardWords: { ...defaultWordsState },
      learnedWords: { ...defaultWordsState },
    };

const removeFromState = (state, array, groupNum, pageNum, id) => {
  const wordsArr = state[array][groupNum][pageNum];
  if (wordsArr && wordsArr.includes(id)) wordsArr.splice(wordsArr.indexOf(id), 1);
};

const reducerFunc = (array, state, action) => {
  const { groupNum, pageNum, id } = action.payload;
  const newState = { ...state };
  if (!newState[array][groupNum][pageNum]) newState[array][groupNum][pageNum] = [];
  const wordsArray = newState[array][groupNum][pageNum];
  if (!wordsArray.includes(id)) wordsArray.push(id);
  if (array === 'deletedWords') {
    removeFromState(newState, 'learnedWords', groupNum, pageNum, id);
    removeFromState(newState, 'hardWords', groupNum, pageNum, id);
  }
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
export const learnedWords = (state) => state.app.learnedWords;

export default appSlice.reducer;
