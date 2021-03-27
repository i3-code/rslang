import { createSlice } from '@reduxjs/toolkit';

export const bookSlice = createSlice({
  name: 'book',
  initialState: {
    translation: true,
    displayActions: true,
    page: 0,
    group: 0,
  },
  reducers: {
    setTranslation: (state) => {
      state.translation = !state.translation;
    },
    setDisplayActions: (state) => {
      state.displayActions = !state.displayActions;
    },
    setPage: (state, action) => {
      state.page = action.payload.numberPage
    },
    setGroup: (state, action) => {
      state.group = action.payload.groupNum
    }
  },
});

export const { setTranslation, setDisplayActions, setPage, setGroup } = bookSlice.actions;

export const translation = state => state.book.translation;
export const displayActions = state => state.book.displayActions;
export const page = state => state.book.page;
export const group = state => state.book.group;

export default bookSlice.reducer;
