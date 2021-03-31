import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('words')
  ? JSON.parse(localStorage.getItem('words'))
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
      const { groupNum, id } = action.payload;
      const newState = { ...state };
      const wordsArray = newState.deletedWords[groupNum];
      if (!wordsArray.includes(id)) wordsArray.push(id);
    },
    setHardWords: (state, action) => {
      const { groupNum, id } = action.payload;
      const newState = { ...state };
      const wordsArray = newState.hardWords[groupNum];
      if (!wordsArray.includes(id)) wordsArray.push(id);
    },
  },
});

export const { setDeletedWords, setHardWords } = appSlice.actions;

export const deletedWords = (state) => state.app.deletedWords;
export const hardWords = (state) => state.app.hardWords;

export default appSlice.reducer;
