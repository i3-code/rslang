import React, { useState, useEffect, useCallback } from 'react';
import { Box } from '@material-ui/core';
import data from '../data-example';
import Timer from '../../components/Timer';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { calculatePercentResult, shuffle } from '../../../../functions/math';
import './styles.css';
const dataShuffled = shuffle(data);
const Streak = ({ streak }) => {
  return <div>Correct streak:{streak}</div>;
};

const SprintGame = ({ onGameEnd, gameEnded, setAnswersResults, setResult }) => {
  const [showUI, setShowUI] = useState(true);
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
      setShowUI(false);
    } else {
      newWord = { typing: null, correctTranslate: null, shownTranslate: null, id: null };
      endGame();
    }
    return newWord;
  };

  const updateStreak = useCallback(
    (incrementStreak = true) => {
      incrementStreak ? setStreak(streak + 1) : setStreak(0);
      const multiplierValue = streak >= 9 ? 80 : streak >= 6 ? 40 : streak >= 3 ? 20 : 10;
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
      console.log(1);
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
    if (!gameEnded) {
      setWord(generateNewWord(counter));
      setShowUI(true);
    }
  }, [setWord, counter, gameEnded, setShowUI]);

  useEffect(() => {
    window.addEventListener('keydown', keyboardEvents);
    return () => {
      window.removeEventListener('keydown', keyboardEvents);
    };
  }, [keyboardEvents]);

  const gameLayout = (
    <div className="sprint">
      Score: {score}
      <br />
      Words used: {counter}
      <br />
      timer: <Timer seconds={60} onTimerEnd={endGame} />
      <br />
      <Streak streak={streak} />
      <div class="animation-wrap">
        <TransitionGroup>
          <CSSTransition key={word.id} timeout={500} classNames="slide">
            <h1 class="sprint__word">{word.typing}</h1>
          </CSSTransition>
        </TransitionGroup>
      </div>
      <div class="animation-wrap">
        <TransitionGroup>
          <CSSTransition key={word.id} timeout={500} classNames="slide">
            <h2 class="sprint__translation">{word.shownTranslate}</h2>
          </CSSTransition>
        </TransitionGroup>
      </div>
      <div>
        <button onClick={() => checkAnswer(false)}>не верно</button>
        <button onClick={() => checkAnswer(true)}>верно</button>
      </div>
    </div>
  );
  return gameLayout;
};

export default SprintGame;
