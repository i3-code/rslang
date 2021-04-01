import React, { useState, useEffect, useCallback } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Button } from '@material-ui/core';
import data from '../data-example';
import Timer from '../../components/Timer';
import { calculatePercentResult, shuffle } from '../../../../functions/math';
import './styles.css';
const dataShuffled = shuffle(data);
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

const SprintGame = ({ onGameEnd, setAnswersResults, setResult, gameState }) => {
  const [scoreMultiplier, setScoreMultiplier] = useState(10);
  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(0);
  const [streak, setStreak] = useState(0);
  const [word, setWord] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const generateNewWord = (index) => {
    let newWord;
    if (index < dataShuffled.length) {
      const typing = dataShuffled[index].word;
      const randomTranslate = dataShuffled[Math.floor(Math.random() * dataShuffled.length)].wordTranslate;
      const correctTranslate = dataShuffled[index].wordTranslate;
      const shownTranslate = Math.random() < 0.5 ? dataShuffled[index].wordTranslate : randomTranslate;
      const id = dataShuffled[index].id;
      newWord = { typing, correctTranslate, shownTranslate, id };
    } else {
      newWord = { typing: null, correctTranslate: null, shownTranslate: null, id: null };
      endGame();
    }
    return newWord;
  };

  const updateStreak = useCallback(
    (incrementStreak = true) => {
      incrementStreak ? setStreak(streak + 1) : setStreak(0);
      const multiplierValue = incrementStreak ? (streak >= 11 ? 80 : streak >= 7 ? 40 : streak >= 3 ? 20 : 10) : 10;
      setScoreMultiplier(multiplierValue);
      if (incrementStreak) setScore(score + scoreMultiplier);
    },
    [score, scoreMultiplier, streak],
  );

  const checkAnswer = useCallback(
    (suggestedAsCorrect) => {
      const shownTranslationIsCorrect = word.shownTranslate === word.correctTranslate;
      const userWasCorrect =
        (shownTranslationIsCorrect && suggestedAsCorrect) || (!shownTranslationIsCorrect && !suggestedAsCorrect);
      updateStreak(userWasCorrect);
      setCounter(counter + 1);
      const editedWord = {
        audio: dataShuffled[counter].audio,
        rightAnswer: dataShuffled[counter].wordTranslate,
        question: dataShuffled[counter].word,
      };
      userWasCorrect
        ? setCorrectAnswers([...correctAnswers, editedWord])
        : setWrongAnswers([...wrongAnswers, editedWord]);
    },
    [counter, updateStreak, word.correctTranslate, word.shownTranslate, wrongAnswers, correctAnswers],
  );

  const keyboardEvents = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') checkAnswer(false);
      if (e.key === 'ArrowRight') checkAnswer(true);
    },
    [checkAnswer],
  );

  const endGame = useCallback(() => {
    onGameEnd(true);
    setResult(calculatePercentResult(correctAnswers.length, dataShuffled.length));
    setAnswersResults({
      wrong: wrongAnswers,
      right: correctAnswers,
    });
  }, [onGameEnd, setAnswersResults, correctAnswers, wrongAnswers, setResult]);

  useEffect(() => {
    if (gameState === 'game') {
      setWord(generateNewWord(counter));
    }
  }, [setWord, counter]);

  useEffect(() => {
    window.addEventListener('keydown', keyboardEvents);
    return () => {
      window.removeEventListener('keydown', keyboardEvents);
    };
  }, [keyboardEvents]);

  const gameLayout = (
    <div className="sprint">
      <div className="sprint__wrap">
        <Streak streak={streak} scoreMultiplier={scoreMultiplier} />
        <div className="sprint__body">
          <div className="sprint__score">Score: {score}</div>
          <Timer className="sprint__timer" seconds={60} onTimerEnd={endGame} />
          <div className="animation-wrap">
            <TransitionGroup>
              <CSSTransition key={word.id} timeout={500} classNames="slide">
                <div className="sprint__word">{word.typing}</div>
              </CSSTransition>
            </TransitionGroup>
          </div>
          <div className="animation-wrap">
            <TransitionGroup className="animation-wrap">
              <CSSTransition key={word.id} timeout={500} classNames="slide">
                <div className="sprint__translation">{word.shownTranslate}</div>
              </CSSTransition>
            </TransitionGroup>
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
    </div>
  );
  return gameLayout;
};

export default SprintGame;
