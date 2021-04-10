import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { calculatePercentResult, shuffle} from '../../../functions/math';
import { playAnswerSound } from '../../../functions/games/answerSound';

export const myGameSlice = createSlice({
  name: 'myGame',
  initialState: {
    rightAnswers:[],
    wrongAnswers:[],
    dataFromBook: false,
    check:false,
    game: false,
    result : 0,
    loading : true,
    sentences : null,
    answer : false,
    level : 0,
    pageNum :1,
    finish : false,
    count : 0,
    currentSentences : null,
    learningWord: null,
    shuffleSentence: null,
    progress: 0,
    percentRightAnswers: 0,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    setDataFromBook: (state, action) => {
      state.dataFromBook = action.payload;
    },
    setPageNum: (state, action) => {
      state.pageNum = action.payload;
    },
    finishLoading: (state) => {
      state.loading = false;
    },
    setLearningWord: (state, action) =>{
      state.learningWord = action.payload;
   },
   setCurrentSentences: (state, action) =>{
    state.currentSentences = action.payload;
    state.shuffleSentence=shuffle(action.payload.split(' '));
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
incrementCount: (state) => {
      state.count++;
    },
      setLevelMyGame:(state, action)=>{
state.level=action.payload;
      },
    setCheckTrue: (state) => {
      state.check = true;
    },
    setCheckFalse: (state) => {
      state.check = false;
    },
    setSentences: (state, action) => {
        state.sentences = action.payload;
      },
    nextSentence: (state, action) =>{
      state.wrongAnswers.push(state.sentences[action.payload.count]);
      playAnswerSound(false);
        state.count++;
        state.check=false;
        let questionNum = state.count;
        state.progress = (questionNum / state.sentences.length) * 100;
        state.percentRightAnswers =
          (state.rightAnswers.length / (state.rightAnswers.length + state.wrongAnswers.length)) * 100;
      },
    setAnswer: (state, action) => {
      if (state.sentences[action.payload.count].textExample === action.payload.answer){
        playAnswerSound(true);
        state.answer=true;
        console.log(state.sentences[action.payload.count])
        state.rightAnswers.push(state.sentences[action.payload.count]
          );
        }
        else  {
          state.answer=false;
          state.wrongAnswers.push(state.sentences[action.payload.count] );
          playAnswerSound(false);
      }
      state.count++;
      let questionNum = state.count;
      state.progress = (questionNum / state.sentences.length) * 100;
      state.percentRightAnswers =
        (state.rightAnswers.length / (state.rightAnswers.length + state.wrongAnswers.length)) * 100;
    },
    setResult: (state) =>{
state.result=calculatePercentResult(state.rightAnswers.length, state.sentences.length)
    },
    restartGame: (state) => {
    state.game=true;
    state.count= 0;
    state.currentSentences=null;
    state.sentences=null;
    state.finish=false;
    state.loading=true;
    state.progress = 0;
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
      state.check=false;
      state.game=false;
      state.result= 0;
      state.loading=true;
      state.sentences =null;
      state.answer= false;
      state.level= 0;
      state.pageNum=1;
      state.finish = false;
      state.count =0;
      state.currentSentences =null;
      state.learningWord= null;
      state.shuffleSentence=null;
      state.progress= 0;
      state.percentRightAnswers=0;
      state.dataFromBook = false;
    },
  },

});

export const selectCheck = (state) => state.myGame.check;
export const selectResult = (state) => state.myGame.result;
export const selectLoading = (state) => state.myGame.loading;
export const selectCurrentSentences = (state) => state.myGame.currentSentences;
export const selectAnswer = (state) => state.myGame.answer;
export const selectSentences = (state) => state.myGame.sentences;
export const selectRightAnswers = (state) => state.myGame.rightAnswers;
export const selectWrongAnswers = (state) => state.myGame.wrongAnswers;
export const selectLevel = (state) => state.myGame.level;
export const selectPageNum = (state) => state.myGame.pageNum;
export const selectFinish = (state) => state.myGame.finish;
export const selectCount = (state) => state.myGame.count;
export const selectIsGame = (state) => state.myGame.game;
export const selectLearningWord = (state) => state.myGame.learningWord;
export const selectShuffleSentence=(state)=> state.myGame.shuffleSentence;
export const selectProgress = (state) => state.myGame.progress;
export const selectPercentRightAnswers = (state) => state.myGame.percentRightAnswers;
export const selectDataFromBook = (state) => state.savannahGame.dataFromBook;


export const {
  setCurrentSentences,
  setLearningWord,
    incrementCount,
    setPageNum,
  startLoading,
  finishLoading,
  setLevelMyGame,
  setCheckTrue,
  setCheckFalse,
  nextSentence,
  restartGame,
  setSentences,
  setFinishFalse,
  setFinishTrue,
  setGameTrue,
  setGameFalse,
  setResult,
  setAnswer,
  resetData,
  setDataFromBook,
} = myGameSlice.actions;

export const fetchSentences = (url) => async (dispatch, getState) => {
  try {
    let group = getState().savannahGame.level;
    let page = getState().savannahGame.pageNum;
    const fetchedData =  await axios.get(`${url}?group=${group}&page=${page}`);
    const sentences = fetchedData.data;
    shuffle(sentences);
    const newPrepare = [];
    sentences.forEach((sentence, index) => {
      newPrepare.push({
        id: index + 1,
        question: sentence.word,
        rightAnswer: sentence.wordTranslate,
        audio: sentence.audio,
        textExample: sentence.textExample.replace(/<\/?[^>]+(>|$)/g, ''),
      });
    });
    dispatch(setSentences(newPrepare));
  } catch (e) {
    console.log(e);
  }
};

export default myGameSlice.reducer;
