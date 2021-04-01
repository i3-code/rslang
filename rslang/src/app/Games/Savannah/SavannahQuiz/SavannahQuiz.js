import './SavannahQuiz.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  nextRound,
  selectDuration,
  selectGetAnswer,
  selectGuardAllowed,
  selectQuestionNumber,
  selectQuiz,
  setAnswer,
} from '../savannahSlice';
import GuardBoard from '../../components/GuardBoard/GuardBoard';
import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const SavannahQuiz = () => {
  const questionNumber = useSelector(selectQuestionNumber);
  const quiz = useSelector(selectQuiz);
  const guardAllowed = useSelector(selectGuardAllowed);
  const duration = useSelector(selectDuration);
  const getAnswer = useSelector(selectGetAnswer);
  const dispatch = useDispatch();

  const [animationFailing, setAnimationFailing] = useState(false);
  const gameQuestionClasses = ['game-question'];
  if (animationFailing) {
    gameQuestionClasses.push('active');
  }

  useEffect(() => {
    setAnimationFailing(false);
    setTimeout(function () {
      setAnimationFailing(true);
    }, 50);
  }, [questionNumber]);

  return (
    <>
      <CSSTransition in={getAnswer} timeout={2000} classNames="hide-question-wrapper">
        <div className="game-question-wrapper">
          <div id="savannah-game-question" className={gameQuestionClasses.join(' ')}>
            {quiz[questionNumber].question}
          </div>
        </div>
      </CSSTransition>
      <GuardBoard guardAllowed={guardAllowed}>
        {quiz[questionNumber].answers.map((answer, index) => (
          <div
            className="game-answer"
            key={index}
            onClick={() => {
              dispatch(setAnswer({ answer, questionNumber, index }));
              setTimeout(() => {
                dispatch(nextRound());
              }, duration);
            }}
          >
            {index + 1}. {answer}
          </div>
        ))}
      </GuardBoard>
    </>
  );
};

export default SavannahQuiz;
