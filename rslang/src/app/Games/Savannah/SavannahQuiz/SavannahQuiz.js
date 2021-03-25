import './SavannahQuiz.css';
import { useSelector, useDispatch } from 'react-redux';
import { nextRound, selectQuestionNumber, selectQuiz, setAnswer } from '../savannahSlice';

const SavannahQuiz = () => {
  const questionNumber = useSelector(selectQuestionNumber);
  const quiz = useSelector(selectQuiz);
  const dispatch = useDispatch();

  return (
    <div className="wrapper-savannah-game">
      <div id="savannah-game-question" className="savannah-game-question active">
        {quiz[questionNumber].question}
      </div>
      {quiz[questionNumber].answers.map((answer, index) => (
        <div
          className="savannah-game-answer"
          key={index}
          onClick={() => {
            dispatch(setAnswer({ answer, questionNumber }));
            dispatch(nextRound());
          }}
        >
          {index + 1}. {answer}
        </div>
      ))}
    </div>
  );
};

export default SavannahQuiz;
