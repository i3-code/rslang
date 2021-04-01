import { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './styles.css';

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
  }, [onTimerEnd, timeLeft]);

  return (
    <div className="animation-wrap timer-wrap">
      <TransitionGroup>
        <CSSTransition key={timeLeft} timeout={500} classNames="slide-vertical">
          <div className="timer">{timeLeft}</div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default Timer;
