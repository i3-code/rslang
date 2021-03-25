import { useState, useEffect } from 'react';
// source: https://stackoverflow.com/questions/57137094/implementing-a-countdown-timer-in-react-with-hooks
const Timer = ({ seconds, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    if (!timeLeft) {
      clearInterval(intervalId);
      onTimerEnd();
    }
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return <div>{timeLeft}</div>;
};

export default Timer;
