import './AudioCallQuiz.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  nextRound,
  selectDuration,
  selectGuardAllowed,
  selectQuestionNumber,
  selectQuiz,
  setAnswer,
} from '../../Savannah/savannahSlice';
import GuardBoard from '../../components/GuardBoard/GuardBoard';
import AudioQuestion from './AudioQuestion/AudioQuestion';

const AudioCallQuiz = () => {
  const questionNumber = useSelector(selectQuestionNumber);
  const quiz = useSelector(selectQuiz);
  const guardAllowed = useSelector(selectGuardAllowed);
  const duration = useSelector(selectDuration);
  const dispatch = useDispatch();

  return (
    <>
      <AudioQuestion />
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

export default AudioCallQuiz;
