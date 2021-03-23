import {useState, useEffect} from 'react';
import { render } from "@testing-library/react";
import {Box, Typography, Grid, Button} from '@material-ui/core';

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

  return (
    <div>{timeLeft}</div>
  );
};
const Streak = () => {
  return(
    <div>streak indicator block</div>
  )
}
const SprintGame = ( ) => {
  const [word, setWord] = useState(null);
  const [translation, setTranslation] = useState(null);
  return(
    <Box>
      <Timer seconds={60}/>
      <Streak />
      <h1>{word}</h1>
      <h2>{translation}</h2>
      <div>
        <button>верно</button>
        <button>не верно</button>
      </div>
    </Box>
  )
}

export default SprintGame;
