import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    deletedWords: {},
    hardWords: {},
  },
  reducers: {
    setDeletedWords: (state, action) => {
      const newDeletedWords = Object.assign({}, state.deletedWords)
      newDeletedWords[action.payload.pageNum] ? newDeletedWords[action.payload.pageNum].push(action.payload.id)
      : newDeletedWords[action.payload.pageNum] = [action.payload.id]
      state.deletedWords = newDeletedWords;
    },
    setHardWords: (state, action) => {
      const newHardWords = Object.assign({}, state.hardWords)
      newHardWords[action.payload.pageNum] ? newHardWords[action.payload.pageNum].push(action.payload.id)
      : newHardWords[action.payload.pageNum] = [action.payload.id]
      state.hardWords = newHardWords;
    },
  },
});

export const { setDeletedWords, setHardWords } = appSlice.actions;

export const deletedWords = state => state.app.deletedWords;
export const hardWords = state => state.app.hardWords;

export default appSlice.reducer;

