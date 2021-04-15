import styles from './SavannahAnswers.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GuardBoard from '../../../components/GuardBoard/GuardBoard';
import ReactionForUserAnswer from '../../../components/ReactionForUserAnswer/ReactionForUserAnswer';
import {
  nextRound,
  selectDuration,
  selectGuardAllowed,
  selectQuestionNumber,
  selectQuiz,
  setAnswer,
} from '../../savannahSlice';

const SavannahAnswers = () => {
  const questionNumber = useSelector(selectQuestionNumber);
  const quiz = useSelector(selectQuiz);
  const guardAllowed = useSelector(selectGuardAllowed);
  const duration = useSelector(selectDuration);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleKeyUp(event) {
      // eslint-disable-next-line
      switch (event.code) {
        case 'Digit1':
        case 'Digit2':
        case 'Digit3':
        case 'Digit4':
          if (guardAllowed) {
            let number = event.code[event.code.length - 1];
            let index = number - 1;
            let answer = quiz[questionNumber].answers[index];
            dispatch(setAnswer( answer, questionNumber, index ));
            setTimeout(() => {
              dispatch(nextRound());
            }, duration);
          }
          break;
      }
    }
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionNumber, guardAllowed]);

  return (
    <ReactionForUserAnswer styles={styles}>
      <GuardBoard guardAllowed={guardAllowed}>
        <div className={styles.answerWrapper}>
          {quiz[questionNumber].answers.map((answer, index) => (
            <div
              className={styles.gameAnswer}
              key={index}
              onClick={() => {
                dispatch(setAnswer( answer, questionNumber, index ));
                setTimeout(() => {
                  dispatch(nextRound());
                }, duration);
              }}
            >
              {index + 1}. {answer}
            </div>
          ))}
        </div>
      </GuardBoard>
    </ReactionForUserAnswer>
  );
};
export default SavannahAnswers;
