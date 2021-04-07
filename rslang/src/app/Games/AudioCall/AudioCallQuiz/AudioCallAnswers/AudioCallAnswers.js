import styles from './AudioCallAnswers.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GuardBoard from '../../../components/GuardBoard/GuardBoard';
import ReactionForUserAnswer from '../../../components/ReactionForUserAnswer/ReactionForUserAnswer';
import {
  nextRound,
  selectGetAnswer,
  selectGuardAllowed,
  selectQuestionNumber,
  selectQuiz,
  setAnswer,
} from '../../../Savannah/savannahSlice';
import { clearAnswerAnimation } from '../../../../../functions/games/answerAnimation';

const AudioCallAnswers = () => {
  const questionNumber = useSelector(selectQuestionNumber);
  const quiz = useSelector(selectQuiz);
  const guardAllowed = useSelector(selectGuardAllowed);
  const getAnswer = useSelector(selectGetAnswer);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleKeyUp(event) {
      // eslint-disable-next-line
      switch (event.code) {
        case 'Enter':
          if (getAnswer) {
            dispatch(nextRound());
            clearAnswerAnimation(styles.gameAnswer, styles.wrongAnswer);
            clearAnswerAnimation(styles.gameAnswer, styles.rightAnswer);
          }
          break;
        case 'Digit1':
        case 'Digit2':
        case 'Digit3':
        case 'Digit4':
          let number = event.code[event.code.length - 1];
          let index = number - 1;
          let answer = quiz[questionNumber].answers[index];
          dispatch(setAnswer({ answer, questionNumber, index }));
          break;
      }
    }
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionNumber, getAnswer]);

  return (
    <ReactionForUserAnswer styles={styles} autoClear={false}>
      <GuardBoard guardAllowed={guardAllowed}>
        {quiz[questionNumber].answers.map((answer, index) => (
          <div
            className={styles.gameAnswer}
            key={index}
            onClick={() => {
              dispatch(setAnswer({ answer, questionNumber, index }));
            }}
          >
            {index + 1}. {answer}
          </div>
        ))}
      </GuardBoard>
      {getAnswer && (
        <div className={styles.nextButtonWrapper}>
          <button
            className={styles.nextButton}
            onClick={() => {
              dispatch(nextRound());
              clearAnswerAnimation(styles.gameAnswer, styles.wrongAnswer);
              clearAnswerAnimation(styles.gameAnswer, styles.rightAnswer);
            }}
          />
        </div>
      )}
    </ReactionForUserAnswer>
  );
};
export default AudioCallAnswers;
