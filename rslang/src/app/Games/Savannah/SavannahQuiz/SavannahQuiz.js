import styles from './SavannahQuiz.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { nextRound, selectQuestionNumber, selectQuiz, setAnswer } from '../savannahSlice';

const SavannahQuiz = () => {
  const questionNumber = useSelector(selectQuestionNumber);
  const quiz = useSelector(selectQuiz);
  const dispatch = useDispatch();

  return (
    <>
      <div id="savannah-game-question" className={`${styles.gameQuestion} ${styles.active}`}>
        {quiz[questionNumber].question}
      </div>
      {quiz[questionNumber].answers.map((answer, index) => (
        <div
          className={styles.gameAnswer}
          key={index}
          onClick={() => {
            dispatch(setAnswer({ answer, questionNumber }));
            dispatch(nextRound());
          }}
        >
          {index + 1}. {answer}
        </div>
      ))}
    </>
  );
};

export default SavannahQuiz;
