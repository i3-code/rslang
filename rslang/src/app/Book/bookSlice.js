import { createSlice } from '@reduxjs/toolkit';

import saveState from '../../functions/saveState';

const saveName = 'book';
const initialState = localStorage.getItem(saveName)
  ? JSON.parse(localStorage.getItem(saveName))
  : {
      translate: true,
      controls: true,
      page: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      currentDataForGames: {},
    };

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setTranslate: (state) => {
      state.translate = !state.translate;
      saveState(saveName, state);
    },
    setControls: (state) => {
      state.controls = !state.controls;
      saveState(saveName, state);
    },
    setPage: (state, action) => {
      const { groupNum, pageNum } = action.payload;
      state.page[groupNum] = pageNum;
      saveState(saveName, state);
    },
    setCurrentDataForGames: (state, action) => {
      state.currentDataForGames = action.payload;
    },
    resetCurrentDataForGames: (state) => {
      state.currentDataForGames = {};
    },
  },
});

export const {
  setTranslate,
  setControls,
  setPage,
  setCurrentDataForGames,
  resetCurrentDataForGames,
} = bookSlice.actions;

export const translate = (state) => state.book.translate;
export const controls = (state) => state.book.controls;
export const page = (state) => state.book.page;
export const currentDataForGames = (state) => state.book.currentDataForGames;

export default bookSlice.reducer;
