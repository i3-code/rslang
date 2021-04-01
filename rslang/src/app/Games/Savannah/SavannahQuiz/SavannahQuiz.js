import './SavannahQuiz.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  nextRound,
  selectDuration,
  selectGuardAllowed,
  selectQuestionNumber,
  selectQuiz,
  setAnswer,
} from '../savannahSlice';
import GuardBoard from '../../components/GuardBoard/GuardBoard';

const SavannahQuiz = () => {
  const questionNumber = useSelector(selectQuestionNumber);
  const quiz = useSelector(selectQuiz);
  const guardAllowed = useSelector(selectGuardAllowed);
  const duration = useSelector(selectDuration);
  const dispatch = useDispatch();

  return (
    <>
      <div className="game-question-wrapper">
        <div id="savannah-game-question" className="game-question active">
          {quiz[questionNumber].question}
        </div>
      </div>
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
