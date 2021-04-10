import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { calculatePercentResult } from '../../../functions/math';
import correct from '../../../sounds/rightAnswer.mp3';
import wrong from '../../../sounds/wrongAnswer.mp3';

let audioCorrect = new Audio(correct);
let audioWrong = new Audio(wrong);

export const addGameSlice = createSlice({
  name: 'addGame',
  initialState: {
    rightAnswers:[],
    wrongAnswers:[],
    chooseLevel: true,
    game: false,
    result : 0,
    loading : true,
    currentWord: null,
    words : null,
    answer : false,
    level : 0,
    pageNum : 1,
    finish : false,
    count : 0,
    randomWords: null,
    mute: false,
    progress: 0,
    percentRightAnswers: 0,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    finishLoading: (state) => {
      state.loading = false;
    },
    setDataFromBook: (state, action) => {
      state.dataFromBook = action.payload;
    },
    setPageNum: (state, action) => {
      state.pageNum = action.payload;
    },
    setMute:(state)=>{
      state.mute=!state.mute;
    },
    setFinishFalse: (state) =>{
       state.finish = false;
    },
    setFinishTrue: (state) =>{
      state.finish = true;
    },
    setGameTrue:(state) =>{
      state.game = true;
    },
    setGameFalse:(state) =>{
      state.game = false;
    },
    setCurrentWord: (state, action) =>{
      state.currentWord = action.payload;
   },
    setLevelAddGame:(state, action)=>{
      state.level = action.payload;
    },
    setChooseLevelFalse: (state) => {
      state.chooseLevel = false;
    },
    setWords: (state, action) => {
      state.words = action.payload;
    },
    setRandomWords:(state)=> {
      let cards = [state.count];
      for (let i = 0; i < 3; i++) {
        const num = Math.floor(Math.random() * state.words.length)
        cards.includes(num) ? i-- : cards.push(num)
      }
      cards.sort(() => Math.random() - 0.5);
      state.randomWords = cards;
    },
    setAnswer: (state, action) => {
      if (state.count === state.randomWords[action.payload]){
        if(!state.mute) { audioCorrect.play() }
        state.answer=true;
        state.rightAnswers.push(state.words[state.count]);
        }
      else {
        if(!state.mute) { audioWrong.play() }
        state.answer=false;
        state.wrongAnswers.push(state.words[state.count]);
      }
    },
    setCount: (state) => {
      ++state.count;
      let questionNum = state.count;
      state.progress = (questionNum / state.words.length) * 100;
      state.percentRightAnswers =
        (state.rightAnswers.length / (state.rightAnswers.length + state.wrongAnswers.length)) * 100;
    },
    setResult: (state) =>{
      state.result=calculatePercentResult(state.rightAnswers.length, state.words.length)
    },
    restartGame: (state) => {
    state.game=true;
    state.count= 0;
    state.result=0;
    state.wrongAnswers=[];
    state.rightAnswers=[];
    state.words = null;
    state.randomWords = null;
    state.progress = 0;
    state.finish=false;
    state.loading=true;
    if (state.pageNum < 31) {
      state.pageNum++;
    } else if (state.level < 7) {
      state.pageNum=1;
      state.level++;
    } else {
      state.pageNum=1;
      state.level=0;
    }
    },
    resetData: (state) => {
      state.rightAnswers=[];
      state.wrongAnswers=[];
      state.game=false;
      state.result= 0;
      state.loading=true;
      state.level= 0;
      state.pageNum=1;
      state.finish = false;
      state.count =0;
      state.progress= 0;
      state.percentRightAnswers=0;
      state.dataFromBook = false;
      state.words = null;
      state.randomWords = null;
    },
  },
});

export const selectResult = (state) => state.addGame.result;
export const selectLoading = (state) => state.addGame.loading;
export const selectCurrentWord = (state) => state.addGame.currentWord;
export const selectAnswer = (state) => state.addGame.answer;
export const selectWords = (state) => state.addGame.words;
export const selectRandomWords = (state) => state.addGame.randomWords;
export const selectRightAnswers = (state) => state.addGame.rightAnswers;
export const selectWrongAnswers = (state) => state.addGame.wrongAnswers;
export const selectLevel = (state) => state.addGame.level;
export const selectPageNum = (state) => state.addGame.pageNum;
export const selectFinish = (state) => state.addGame.finish;
export const selectCount = (state) => state.addGame.count;
export const selectIsGame = (state) => state.addGame.game;
export const chooseLevelRedux = (state) => state.addGame.chooseLevel;
export const selectMute = (state) => state.addGame.mute;
export const selectProgress = (state) => state.addGame.progress;
export const selectPercentRightAnswers = (state) => state.addGame.percentRightAnswers;
export const selectDataFromBook = (state) => state.addGame.dataFromBook;

export const {
  setMute,
  startLoading,
  finishLoading,
  setChooseLevelFalse,
  setLevelAddGame,
  restartGame,
  setFinishFalse,
  setFinishTrue,
  setGameTrue,
  setGameFalse,
  setResult,
  setAnswer,
  setRandomWords,
  setWords,
  setCount,
  setDataFromBook,
  setPageNum,
  resetData,
  setCurrentWord
} = addGameSlice.actions;

export const fetchWords = (url) => async (dispatch, getState) => {
  try {
    let group = getState().addGame.level;
    let page = getState().addGame.pageNum;
    const fetchedData = await axios.get(`${url}?group=${group}&page=${page}`);
    const data = fetchedData.data;
    const newWords = [];
    data.forEach((item, index) => {
      newWords.push({
        id: index + 1,
        question: item.word,
        rightAnswer: item.wordTranslate,
        audio: item.audio,
        textExample: item.textExample.replace(/<\/?[^>]+(>|$)/g, ''),
        image: item.image
      });
    });
    dispatch(setWords(newWords));
  } catch (e) {
    console.log(e);
  }
};

export default addGameSlice.reducer;
