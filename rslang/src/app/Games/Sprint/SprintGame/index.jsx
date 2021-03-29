import { useState, useEffect, useCallback } from 'react';
import { Box } from '@material-ui/core';
import data from '../data-example';
import Timer from '../../components/Timer';
import { calculatePercentResult, shuffle } from '../../../../functions/math';
const dataShuffled = shuffle(data);
const Streak = ({ streak }) => {
  return <div>Correct streak:{streak}</div>;
};

const SprintGame = ({ onGameEnd, gameEnded, setAnswersResults, setResult }) => {
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
      newWord = { typing, correctTranslate, shownTranslate };
    } else {
      newWord = { typing: null, correctTranslate: null, shownTranslate: null };
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
    if (!gameEnded) setWord(generateNewWord(counter));
  }, [setWord, counter, gameEnded]);

  useEffect(() => {
    window.addEventListener('keydown', keyboardEvents);
    return () => {
      window.removeEventListener('keydown', keyboardEvents);
    };
  }, [keyboardEvents]);

  const gameLayout = (
    <Box>
      Score: {score}
      <br />
      Words used: {counter}
      <br />
      timer: <Timer seconds={60} onTimerEnd={endGame} />
      <br />
      <Streak streak={streak} />
      <h1>{word.typing}</h1>
      <h2>{word.shownTranslate}</h2>
      <div>
        <button onClick={() => checkAnswer(false)}>не верно</button>
        <button onClick={() => checkAnswer(true)}>верно</button>
      </div>
    </Box>
  );
  return gameLayout;
};

export default SprintGame;
