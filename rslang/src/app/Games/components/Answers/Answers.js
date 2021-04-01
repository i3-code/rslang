import styles from './Answers.module.css';
import GuardBoard from '../GuardBoard/GuardBoard';
import {
  nextRound,
  selectCurrentAnswer,
  selectDuration,
  selectGetAnswer,
  selectGetRightAnswer,
  selectGuardAllowed,
  selectQuestionNumber,
  selectQuiz,
  setAnswer,
} from '../../Savannah/savannahSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setAnswerAnimation } from '../../../../functions/games/answerAnimation';
import { playAnswerSound } from '../../../../functions/games/answerSound';

const Answers = () => {
  const questionNumber = useSelector(selectQuestionNumber);
  const quiz = useSelector(selectQuiz);
  const guardAllowed = useSelector(selectGuardAllowed);
  const duration = useSelector(selectDuration);
  const currentAnswer = useSelector(selectCurrentAnswer);
  const getAnswer = useSelector(selectGetAnswer);
  const getRightAnswer = useSelector(selectGetRightAnswer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getAnswer) {
      if (getRightAnswer) {
        setAnswerAnimation(styles.gameAnswer, currentAnswer, styles.rightAnswer, duration);
        playAnswerSound(true);
      } else {
        setAnswerAnimation(styles.gameAnswer, currentAnswer, styles.wrongAnswer, duration);
        setAnswerAnimation(
          styles.gameAnswer,
          quiz[questionNumber].answers.indexOf(quiz[questionNumber].rightAnswer),
          styles.rightAnswer,
          duration,
        );
        playAnswerSound(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAnswer]);

  return (
    <GuardBoard guardAllowed={guardAllowed}>
      {quiz[questionNumber].answers.map((answer, index) => (
        <div
          className={styles.gameAnswer}
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
  );
};
export default Answers;
