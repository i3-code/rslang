import { createSlice } from '@reduxjs/toolkit';
import { WordsService } from '../services/words.service';

const initialState = 0;

export const wordsSlice = createSlice({
  name: 'save',
  initialState,
  reducers: {
    saveWords: (state, action) => {
      state = state + 1;
    },
  },
});

export const saveWordStat = (word, stat) => async (dispatch, getState) => {
  try {
    const isLogged = getState().user.value;

    if (isLogged) {
      WordsService.addWordStat(word, stat);
    }
  } catch (e) {
    console.log(e);
  }
};

export const { setWords } = wordsSlice.actions;
export const getWords = (state) => state.words;
export default wordsSlice.reducer;
