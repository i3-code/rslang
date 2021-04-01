import './Answers.css';
import GuardBoard from '../GuardBoard/GuardBoard';
import {
  nextRound,
  selectDuration,
  selectGuardAllowed,
  selectQuestionNumber,
  selectQuiz,
  setAnswer,
} from '../../Savannah/savannahSlice';
import { useDispatch, useSelector } from 'react-redux';

const Answers = () => {
  const questionNumber = useSelector(selectQuestionNumber);
  const quiz = useSelector(selectQuiz);
  const guardAllowed = useSelector(selectGuardAllowed);
  const duration = useSelector(selectDuration);
  const dispatch = useDispatch();

  return (
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
  );
};
export default Answers;
