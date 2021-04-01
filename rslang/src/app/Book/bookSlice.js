import { createSlice } from '@reduxjs/toolkit';

import saveState from '../../functions/saveState';

const saveName = 'book';
const initialState = localStorage.getItem(saveName)
  ? JSON.parse(localStorage.getItem(saveName))
  : {
      translate: true,
      controls: true,
      page: {
        0: 1,
        1: 1,
        2: 1,
        3: 1,
        4: 1,
        5: 1,
      },
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
  },
});

export const { setTranslate, setControls, setPage } = bookSlice.actions;

export const translate = (state) => state.book.translate;
export const controls = (state) => state.book.controls;
export const page = (state) => state.book.page;

export default bookSlice.reducer;
