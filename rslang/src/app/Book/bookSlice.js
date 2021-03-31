import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('book')
  ? JSON.parse(localStorage.getItem('book'))
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

const saveState = (state) => {
  const currentState = { ...state };
  localStorage.setItem('book', JSON.stringify(currentState));
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setTranslate: (state) => {
      state.translate = !state.translate;
      saveState(state);
    },
    setControls: (state) => {
      state.controls = !state.controls;
      saveState(state);
    },
    setPage: (state, action) => {
      console.log(action);
      const { groupNum, pageNum } = action.payload;
      state.page[groupNum] = pageNum;
      saveState(state);
    },
  },
});

export const { setTranslate, setControls, setPage } = bookSlice.actions;

export const translate = (state) => state.book.translate;
export const controls = (state) => state.book.controls;
export const page = (state) => state.book.page;

export default bookSlice.reducer;
