import styles from './SavannahQuestion.module.css';
import { CSSTransition } from 'react-transition-group';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectGetAnswer, selectQuestionNumber, selectQuiz } from '../../savannahSlice';

const SavannahQuestion = () => {
  const questionNumber = useSelector(selectQuestionNumber);
  const quiz = useSelector(selectQuiz);
  const getAnswer = useSelector(selectGetAnswer);

  const [animationFailing, setAnimationFailing] = useState(false);
  const gameQuestionClasses = [styles.gameQuestion];
  if (animationFailing) {
    gameQuestionClasses.push(styles.active);
  }

  useEffect(() => {
    setAnimationFailing(false);
    setTimeout(function () {
      setAnimationFailing(true);
    }, 50);
  }, [questionNumber]);

  return (
    <CSSTransition
      in={getAnswer}
      timeout={2000}
      classNames={{
        enterActive: styles.hideQuestionWrapperEnter,
        enterDone: styles.hideQuestionWrapperActive,
      }}
    >
      <div className={styles.gameQuestionWrapper}>
        <div className={gameQuestionClasses.join(' ')}>{quiz[questionNumber].question}</div>
      </div>
    </CSSTransition>
  );
};
export default SavannahQuestion;
