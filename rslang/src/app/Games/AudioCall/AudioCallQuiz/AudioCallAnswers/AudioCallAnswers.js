import styles from './AudioCallAnswers.module.css';
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
} from '../../../Savannah/savannahSlice';

const AudioCallAnswers = () => {
  const questionNumber = useSelector(selectQuestionNumber);
  const quiz = useSelector(selectQuiz);
  const guardAllowed = useSelector(selectGuardAllowed);
  const duration = useSelector(selectDuration);
  const dispatch = useDispatch();

  return (
    <ReactionForUserAnswer styles={styles}>
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
    </ReactionForUserAnswer>
  );
};
export default AudioCallAnswers;
