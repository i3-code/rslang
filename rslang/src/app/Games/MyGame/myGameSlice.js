import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { calculatePercentResult, shuffle} from '../../../functions/math';
import correct from './audio/correct.mp3';

let audioCorrect = new Audio(correct);

export const myGameSlice = createSlice({
  name: 'myGame',
  initialState: {
    rightAnswers:[],
    wrongAnswers:[],
    chooseLevel: true,
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
    mute: false,
    shuffleSentence: null,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    finishLoading: (state) => {
      state.loading = false;
    },
    setMute:(state)=>{
state.mute=!state.mute;
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
      setLevel:(state, action)=>{
state.lavel=action.payload;
      },
    setCheckTrue: (state) => {
      state.check = true;
    },
    setCheckFalse: (state) => {
      state.check = false;
    },
    setChooseLevelFalse: (state) => {
      state.chooseLevel = false;
    },
    setSentences: (state, action) => {
        state.sentences = action.payload;
      },
    nextSentence: (state, action) =>{
      state.wrongAnswers.push(state.sentences[action.payload.count]);
        state.count++;
        state.check=false;
      },
    setAnswer: (state, action) => {
      if (state.sentences[action.payload.count].textExample === action.payload.answer){
        if(state.mute)
        audioCorrect.play()
        state.answer=true;
        state.rightAnswers.push(state.sentences[action.payload.count]
          );
        }
        else  {
          state.answer=false;
          state.wrongAnswers.push(state.sentences[action.payload.count] );
      }
      state.count++
    },
    setResult: (state) =>{
state.result=calculatePercentResult(state.rightAnswers.length, state.sentences.length)
    },
    restartGame: (state) => {
    state.game=true;
    state.count= 0;
    state.result=0;
    state.wrongAnswers=[];
    state.rightAnswers=[];
    state.currentSentences=null;
    state.sentences=null;
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
export const chooseLevelRedux = (state) => state.myGame.chooseLevel;
export const selectLearningWord = (state) => state.myGame.learningWord;
export const selectMute = (state) => state.myGame.mute;
export const selectShuffleSentence=(state)=> state.myGame.shuffleSentence;



export const {
  setMute,
  setCurrentSentences,
  setLearningWord,
    incrementCount,
  startLoading,
  finishLoading,
  setChooseLevelFalse,
  setLevel,
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
} = myGameSlice.actions;

export const fetchSentences = (url) => async (dispatch) => {
  try {
    const fetchedData = await axios.get(url);
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
