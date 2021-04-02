import { useEffect } from 'react';
import { setAnswerAnimation } from '../../../../functions/games/answerAnimation';
import { playAnswerSound } from '../../../../functions/games/answerSound';
import { useSelector } from 'react-redux';
import {
  selectCurrentAnswer,
  selectDuration,
  selectGetAnswer,
  selectGetRightAnswer,
  selectQuestionNumber,
  selectQuiz,
} from '../../Savannah/savannahSlice';

const ReactionForUserAnswer = ({ children, styles }) => {
  const questionNumber = useSelector(selectQuestionNumber);
  const quiz = useSelector(selectQuiz);
  const duration = useSelector(selectDuration);
  const currentAnswer = useSelector(selectCurrentAnswer);
  const getAnswer = useSelector(selectGetAnswer);
  const getRightAnswer = useSelector(selectGetRightAnswer);

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

  return <>{children}</>;
};

export default ReactionForUserAnswer;
