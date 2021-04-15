import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { calculatePercentResult, shuffle, getRandomAnswers } from '../../../functions/math';
import { playAnswerSound } from '../../../functions/games/answerSound';
import { checkContainAnswerArray } from '../../../functions/games/answerContain';
import { setWords } from '../../../redux/wordsSlice';
import { WORD_STATS } from '../../../constants';
import { saveWordStat } from '../../../redux/saveSlice';

export const savannahSlice = createSlice({
  name: 'savannahGame',
  initialState: {
    duration: 1000,
    timer: 0,
    result: 0,
    loading: true,
    questionNumber: 0,
    quiz: [],
    start: false,
    statistics: null,
    rightAnswers: [],
    wrongAnswers: [],
    guardAllowed: true,
    getAnswer: false,
    currentAnswer: 0,
    getRightAnswer: false,
    level: 0,
    pageNum: 0,
    dataFromBook: false,
    progress: 0,
    percentRightAnswers: 0,
  },
  reducers: {
    incrementTimer: (state) => {
      state.timer++;
    },
    startGame: (state) => {
      state.start = true;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    finishLoading: (state) => {
      state.loading = false;
    },
    incrementQuestionNumber: (state) => {
      state.questionNumber++;
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    nextRound: (state) => {
      state.getAnswer = false;
      state.guardAllowed = true;
      if (state.questionNumber >= state.quiz.length - 1) {
        state.result = calculatePercentResult(state.quiz.filter((q) => q.status).length, state.quiz.length);
        state.start = false;
        state.statistics = true;

        return;
      }
      state.timer = 0;
      state.questionNumber++;
    },
    setAnswerReducer: (state, action) => {
      state.guardAllowed = false;
      state.getAnswer = true;
      state.currentAnswer = action.payload.index;
      const quiz = state.quiz[action.payload.questionNumber];
      if (quiz.rightAnswer === action.payload.answer) {
        quiz.status = true;
        if (checkContainAnswerArray(state.rightAnswers, quiz.question)) {
          state.rightAnswers.push(quiz);
        }
        state.getRightAnswer = true;
      } else {
        state.getRightAnswer = false;
        if (checkContainAnswerArray(state.wrongAnswers, quiz.question)) {
          state.wrongAnswers.push(quiz);
        }
      }
      let questionNum = state.questionNumber;
      questionNum++;
      state.progress = (questionNum / state.quiz.length) * 100;
      state.percentRightAnswers =
        (state.rightAnswers.length / (state.rightAnswers.length + state.wrongAnswers.length)) * 100;
    },
    restartGame: (state) => {
      if (state.pageNum < 31) {
        state.pageNum++;
      } else if (state.level < 7) {
        state.pageNum = 1;
        state.level++;
      } else {
        state.pageNum = 1;
        state.level = 0;
      }
      state.timer = 0;
      state.questionNumber = 0;
      state.statistics = null;
      state.start = true;
      state.progress = 0;
    },
    timeFinished: (state) => {
      if (checkContainAnswerArray(state.wrongAnswers, state.quiz[state.questionNumber].question)) {
        state.wrongAnswers.push(state.quiz[state.questionNumber]);
      }
      playAnswerSound(false);
    },
    resetData: (state) => {
      state.timer = 0;
      state.questionNumber = 0;
      state.statistics = null;
      state.quiz = [];
      state.rightAnswers = [];
      state.wrongAnswers = [];
      state.getAnswer = false;
      state.currentAnswer = 0;
      state.getRightAnswer = false;
      state.start = false;
      state.loading = true;
      state.guardAllowed = true;
      state.level = 0;
      state.pageNum = 0;
      state.progress = 0;
      state.percentRightAnswers = 0;
      state.dataFromBook = false;
    },
    setLevel: (state, action) => {
      state.level = action.payload;
    },
    setPageNum: (state, action) => {
      state.pageNum = action.payload;
    },
    setDataFromBook: (state, action) => {
      state.dataFromBook = action.payload;
    },
  },
});

export const selectTimer = (state) => state.savannahGame.timer;
export const selectResult = (state) => state.savannahGame.result;
export const selectLoading = (state) => state.savannahGame.loading;
export const selectQuestionNumber = (state) => state.savannahGame.questionNumber;
export const selectQuiz = (state) => state.savannahGame.quiz;
export const selectStart = (state) => state.savannahGame.start;
export const selectStatistics = (state) => state.savannahGame.statistics;
export const selectRightAnswers = (state) => state.savannahGame.rightAnswers;
export const selectWrongAnswers = (state) => state.savannahGame.wrongAnswers;
export const selectGuardAllowed = (state) => state.savannahGame.guardAllowed;
export const selectDuration = (state) => state.savannahGame.duration;
export const selectGetAnswer = (state) => state.savannahGame.getAnswer;
export const selectGetRightAnswer = (state) => state.savannahGame.getRightAnswer;
export const selectCurrentAnswer = (state) => state.savannahGame.currentAnswer;
export const selectProgress = (state) => state.savannahGame.progress;
export const selectPercentRightAnswers = (state) => state.savannahGame.percentRightAnswers;
export const selectDataFromBook = (state) => state.savannahGame.dataFromBook;

export const {
  incrementTimer,
  startLoading,
  finishLoading,
  incrementQuestionNumber,
  setQuiz,
  nextRound,
  setAnswerReducer,
  startGame,
  restartGame,
  timeFinished,
  resetData,
  setLevel,
  setPageNum,
  setDataFromBook,
} = savannahSlice.actions;

export const fetchWordsForQuiz = (url, wordsFromBook) => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    let words;
    if (!wordsFromBook.length) {
      let group = getState().savannahGame.level;
      let page = getState().savannahGame.pageNum;
      const fetchedData = await axios.get(`${url}?group=${group}&page=${page}`);
      words = fetchedData.data;
    } else {
      words = wordsFromBook;
    }
    const answerVariations = words.map((word) => word.wordTranslate);
    shuffle(words);
    const quizWords = words.slice(0, 20);
    const quizPrepare = [];
    quizWords.forEach((word) => {
      quizPrepare.push({
        id: word.id,
        question: word.word,
        answers: getRandomAnswers(word.wordTranslate, answerVariations),
        rightAnswer: word.wordTranslate,
        status: false,
        audio: word.audio,
        image: word.image,
      });
    });
    dispatch(setQuiz(quizPrepare));
    dispatch(finishLoading());
  } catch (e) {
    console.log(e);
  }
};

export const setAnswer = (answer, questionNumber, index) => async (dispatch, getState) => {
  try {
    dispatch(setAnswerReducer({ answer, questionNumber, index }));
    const getRightAnswer = getState().savannahGame.getRightAnswer;
    const quiz = getState().savannahGame.quiz;
    const word = quiz[questionNumber].id;
    if (getRightAnswer) {
      dispatch(setWords({ word, target: WORD_STATS.CORRECT, amount: 1 }));
      dispatch(saveWordStat(word, WORD_STATS.CORRECT));
    } else {
      dispatch(setWords({ word, target: WORD_STATS.WRONG, amount: 1 }));
      dispatch(saveWordStat(word, WORD_STATS.WRONG));
    }
  } catch (e) {
    console.log(e);
  }
};

export default savannahSlice.reducer;
