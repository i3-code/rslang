import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('book')
  ? JSON.parse(localStorage.getItem('book'))
  : {
      translate: true,
      controls: true,
      page: 0,
      group: 0,
    };

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setTranslate: (state) => {
      state.translate = !state.translate;
    },
    setControls: (state) => {
      state.controls = !state.controls;
    },
    setPage: (state, action) => {
      state.page = action.payload.pageNum;
    },
    setGroup: (state, action) => {
      state.group = action.payload.groupNum;
    },
  },
});

export const { setTranslate, setControls, setPage, setGroup } = bookSlice.actions;

export const translate = (state) => state.book.translate;
export const controls = (state) => state.book.controls;
export const page = (state) => state.book.page;
export const group = (state) => state.book.group;

export default bookSlice.reducer;
