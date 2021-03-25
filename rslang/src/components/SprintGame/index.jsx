import { useState, useEffect } from 'react';
import { render } from '@testing-library/react';
import { Box, Typography, Grid, Button } from '@material-ui/core';
import data from './data-example';
// source: https://stackoverflow.com/questions/57137094/implementing-a-countdown-timer-in-react-with-hooks
const Timer = ({ seconds }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return <div>{timeLeft}</div>;
};

const Streak = ({ streak }) => {
  return <div>{streak}</div>;
};

const SprintGame = () => {
  const generateNewWord = (index) => {
    const typing = data[index].word;
    const randomTranslate = data[Math.floor(Math.random() * data.length)].wordTranslate;
    const correctTranslate = data[index].wordTranslate;
    const shownTranslate = Math.random() < 0.5 ? data[index].wordTranslate : randomTranslate;
    return { typing, correctTranslate, shownTranslate };
  };

  const [counter, setCounter] = useState(0);
  const [streak, setStreak] = useState(0);
  const [word, setWord] = useState(generateNewWord(0));

  const pickNextWord = () => {
    setCounter(counter + 1);
  };

  const checkAnswer = (suggestedAsCorrect) => {
    const shownTranslationIsCorrect = word.shownTranslate === word.correctTranslate;
    const userWasCorrect =
      (shownTranslationIsCorrect && suggestedAsCorrect) || (!shownTranslationIsCorrect && !suggestedAsCorrect);
    userWasCorrect ? setStreak(streak + 1) : setStreak(0);
    pickNextWord();
  };

  const keyboardEvents = (e) => {
    if (e.key === 'ArrowLeft') checkAnswer(false);
    if (e.key === 'ArrowRight') checkAnswer(true);
  };

  useEffect(() => {
    setWord(generateNewWord(counter));
  }, [setWord, counter]);

  useEffect(() => {
    window.addEventListener('keydown', keyboardEvents);
    return () => {
      window.removeEventListener('keydown', keyboardEvents);
    };
  }, [keyboardEvents]);

  return (
    <Box>
      words used {counter}
      <Timer seconds={60} />
      <Streak streak={streak} />
      <h1>{word.typing}</h1>
      <h2>{word.shownTranslate}</h2>
      <div>
        <button onClick={() => checkAnswer(false)}>не верно</button>
        <button onClick={() => checkAnswer(true)}>верно</button>
      </div>
    </Box>
  );
};

export default SprintGame;
