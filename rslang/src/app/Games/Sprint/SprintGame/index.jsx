import React, { useState, useEffect, useCallback } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useDispatch } from 'react-redux';
import { playAnswerSound } from '../../../../functions/games/answerSound';
import { Button } from '@material-ui/core';
import LinearDeterminate from '../../components/LinearDeterminate/LinearDeterminate';
import Circular from '../../components/Circular/Circular';
import Timer from '../../components/Timer';
import { calculatePercentResult } from '../../../../functions/math';
import './styles.css';
import { setWords } from '../../../../redux/wordsSlice';
import { WORD_STATS } from '../../../../constants';
import { saveWordStat } from '../../../../redux/saveSlice';

const Streak = ({ streak, scoreMultiplier }) => {
  const streakClass = streak >= 12 ? 'streak-03' : streak >= 8 ? 'streak-02' : streak >= 4 ? 'streak-01' : '';
  const marks = ['', '', ''].map((item, index) => {
    const activeCondition = index + 1 <= streak % 4;
    return (
      <div
        key={index}
        className={`streak__unit ${activeCondition || streak >= 12 ? 'streak__unit--active' : ''}`}
      ></div>
    );
  });
  return (
    <div className={`streak ${streakClass}`}>
      <div className="streak__wrap">{marks}</div>
      <div className="streak__comment">{scoreMultiplier} очков за слово</div>
    </div>
  );
};

const defaultWord = { typing: null, correctTranslate: null, shownTranslate: null, id: null };

const SprintGame = ({ setGameState, setAnswersResults, setResult, gameState, words }) => {
  const [scoreMultiplier, setScoreMultiplier] = useState(10);
  const [score, setScore] = useState(0);
  const [bodyHighlight, setBodyHighlight] = useState(null);
  const [counter, setCounter] = useState(0);
  const [streak, setStreak] = useState(0);
  const [word, setWord] = useState(defaultWord);
  const [prevWord, setPrevWord] = useState(defaultWord);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [end, setEnd] = useState(false);
  const [lockInteraction, setLockInteraction] = useState(true);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const generateNewWord = useCallback(
    (index) => {
      let newWord;
      if (index < words.length) {
        const typing = words[index].word;
        const randomTranslate = words[Math.floor(Math.random() * words.length)].wordTranslate;
        const correctTranslate = words[index].wordTranslate;
        const shownTranslate = Math.random() < 0.5 ? words[index].wordTranslate : randomTranslate;
        const id = words[index].id;
        newWord = { typing, correctTranslate, shownTranslate, id };
      } else {
        newWord = defaultWord;
        setEnd(true);
      }
      return newWord;
    },
    [words],
  );

  const updateStreak = useCallback(
    (incrementStreak = true) => {
      incrementStreak ? setStreak(streak + 1) : setStreak(0);
      const multiplierValue = incrementStreak ? (streak >= 11 ? 80 : streak >= 7 ? 40 : streak >= 3 ? 20 : 10) : 10;
      setScoreMultiplier(multiplierValue);
      if (incrementStreak) setScore(score + scoreMultiplier);
    },
    [score, scoreMultiplier, streak],
  );
  const highlightBody = useCallback((isCorrect) => {
    let timer;
    if (timer) clearTimeout(timer);
    setBodyHighlight(isCorrect);
    timer = setTimeout(() => {
      setBodyHighlight(null);
    }, 300);
  }, []);
  const checkAnswer = useCallback(
    (suggestedAsCorrect) => {
      if (!lockInteraction && counter < words.length) {
        const shownTranslationIsCorrect = word.shownTranslate === word.correctTranslate;
        const userWasCorrect =
          (shownTranslationIsCorrect && suggestedAsCorrect) || (!shownTranslationIsCorrect && !suggestedAsCorrect);
        updateStreak(userWasCorrect);
        setProgress(((counter + 1) / words.length) * 100);
        setCounter(counter + 1);
        const editedWord = {
          audio: words[counter].audio,
          rightAnswer: words[counter].wordTranslate,
          question: words[counter].word,
        };

        const wordId = words[counter].id;
        const target = userWasCorrect ? WORD_STATS.CORRECT : WORD_STATS.WRONG;
        dispatch(setWords({ word: wordId, target, amount: 1 }));
        dispatch(saveWordStat(wordId, target));

        userWasCorrect
          ? setCorrectAnswers([...correctAnswers, editedWord])
          : setWrongAnswers([...wrongAnswers, editedWord]);
        highlightBody(userWasCorrect);
        setPrevWord(word);
        playAnswerSound(userWasCorrect);
      }
    },
    [correctAnswers, counter, updateStreak, word, wrongAnswers, lockInteraction, highlightBody, words, dispatch],
  );

  const keyboardEvents = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') checkAnswer(false);
      if (e.key === 'ArrowRight') checkAnswer(true);
    },
    [checkAnswer],
  );
  useEffect(() => {
    if (gameState === 'game' && prevWord === word) setWord(generateNewWord(counter));
  }, [counter, gameState, generateNewWord, prevWord, word]);

  useEffect(() => {
    window.addEventListener('keydown', keyboardEvents);
    return () => {
      window.removeEventListener('keydown', keyboardEvents);
    };
  }, [keyboardEvents]);

  useEffect(() => {
    if (end) {
      setGameState('end');
      setResult(calculatePercentResult(correctAnswers.length, words.length));
      setAnswersResults({
        wrong: wrongAnswers,
        right: correctAnswers,
      });
    }
  }, [correctAnswers, end, setAnswersResults, setGameState, setResult, wrongAnswers, words]);

  const handleEnd = useCallback(() => {
    setEnd(true);
  }, []);
  const gameLayout = (
    <div className="sprint">
      <LinearDeterminate progress={progress} style={{ marginBottom: '30px' }} />
      <div
        className={`sprint__wrap ${
          bodyHighlight !== null ? (bodyHighlight ? 'sprint__wrap--correct' : 'sprint__wrap--wrong') : ''
        }`}
      >
        <Streak streak={streak} scoreMultiplier={scoreMultiplier} />
        <div className="sprint__body">
          <div className="sprint__score">Score: {score}</div>
          <Timer className="sprint__timer" seconds={60} onTimerEnd={handleEnd} />
          <div className="animation-wrap">
            <SwitchTransition>
              <CSSTransition key={word.id} timeout={500} classNames="slide">
                <div className="sprint__word">{word.typing}</div>
              </CSSTransition>
            </SwitchTransition>
          </div>
          <div className="animation-wrap">
            <SwitchTransition>
              <CSSTransition
                key={word.id}
                timeout={500}
                classNames="slide"
                onEntered={() => setLockInteraction(false)}
                onExit={() => setLockInteraction(true)}
              >
                <div className="sprint__translation">{word.shownTranslate}</div>
              </CSSTransition>
            </SwitchTransition>
          </div>
          <div>
            <Button className="sprint__button" variant="contained" color="secondary" onClick={() => checkAnswer(false)}>
              не верно
            </Button>
            <Button className="sprint__button" variant="contained" color="primary" onClick={() => checkAnswer(true)}>
              верно
            </Button>
          </div>
        </div>
      </div>
      <Circular percentRightAnswers={counter > 0 ? (correctAnswers.length / counter) * 100 : 0} />
    </div>
  );
  return gameLayout;
};

export default SprintGame;
