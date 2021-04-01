import { useState, useEffect } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './styles.css';

// source: https://stackoverflow.com/questions/57137094/implementing-a-countdown-timer-in-react-with-hooks
const Timer = ({ seconds, onTimerEnd, className }) => {
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

  return (
    <div className={`animation-wrap timer-wrap ${className}`}>
      <SwitchTransition>
        <CSSTransition key={timeLeft} timeout={300} classNames="slide-vertical">
          <div className="timer">{timeLeft}</div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default Timer;
