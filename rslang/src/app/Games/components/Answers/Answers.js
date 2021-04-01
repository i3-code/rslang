import './Answers.css';
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
        setAnswerAnimation('game-answer', currentAnswer, 'right-answer', duration);
        playAnswerSound(true);
      } else {
        setAnswerAnimation('game-answer', currentAnswer, 'wrong-answer', duration);
        setAnswerAnimation(
          'game-answer',
          quiz[questionNumber].answers.indexOf(quiz[questionNumber].rightAnswer),
          'right-answer',
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
