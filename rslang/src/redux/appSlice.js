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
      inactivePagination: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
      }
    };

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDeletedWords: (state, action) => {
      const { groupNum, id } = action.payload;
      const newState = { ...state };
      const wordsArray = newState.deletedWords[groupNum];
      if (!wordsArray.includes(id)) wordsArray.push(id);
      saveState(saveName, newState);
    },
    setHardWords: (state, action) => {
      const { groupNum, id } = action.payload;
      const newState = { ...state };
      const wordsArray = newState.hardWords[groupNum];
      if (!wordsArray.includes(id)) wordsArray.push(id);
      saveState(saveName, newState);
    },
    setInactivePagination: (state, action) => {
      const { groupNum, pageNum } = action.payload;
      const newState = { ...state };
      const paginationArray = newState.inactivePagination[groupNum];
      if (!paginationArray.includes(pageNum)) paginationArray.push(pageNum);
      saveState(saveName, newState);
    }
  },
});

export const { setDeletedWords, setHardWords, setInactivePagination } = appSlice.actions;

export const deletedWords = (state) => state.app.deletedWords;
export const hardWords = (state) => state.app.hardWords;
export const inactivePagination = (state) => state.app.inactivePagination;

export default appSlice.reducer;
