import './SavannahQuiz.css';
import { useSelector, useDispatch } from 'react-redux';
import { nextRound, selectQuestionNumber, selectQuiz, setAnswer } from '../savannahSlice';

const SavannahQuiz = () => {
  const questionNumber = useSelector(selectQuestionNumber);
  const quiz = useSelector(selectQuiz);
  const dispatch = useDispatch();

  return (
    <>
      <div id="savannah-game-question" className="game-question active">
        {quiz[questionNumber].question}
      </div>
      {quiz[questionNumber].answers.map((answer, index) => (
        <div
          className="game-answer"
          key={index}
          onClick={() => {
            dispatch(setAnswer({ answer, questionNumber, index }));
            setTimeout(() => {
              dispatch(nextRound());
            }, 2000);
          }}
        >
          {index + 1}. {answer}
        </div>
      ))}
    </>
  );
};

export default SavannahQuiz;
