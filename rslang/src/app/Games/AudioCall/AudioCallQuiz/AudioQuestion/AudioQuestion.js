import styles from './AudioQuestion.module.css';
import { useSelector } from 'react-redux';
import { selectQuestionNumber, selectQuiz } from '../../../Savannah/savannahSlice';
import urls from '../../../../../constants/urls';
import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const AudioQuestion = () => {
  const questionNumber = useSelector(selectQuestionNumber);
  const quiz = useSelector(selectQuiz);

  const playWord = async () => {
    await new Audio(`${urls.base}/${quiz[questionNumber].audio}`).play();
  };

  const [animationButton, setAnimationButton] = useState(false);

  useEffect(() => {
    (async () => await playWord())();
    setAnimationButton((prev) => !prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionNumber]);

  return (
    <div className={styles.gameQuestionWrapper}>
      <div className={styles.gameQuestion}>
        <CSSTransition
          in={animationButton}
          timeout={1000}
          classNames={{
            enterActive: styles.audioButtonAnimationEnter,
            enterDone: styles.audioButtonAnimationEnterActive,
            exitActive: styles.audioButtonAnimationExit,
            exitDone: styles.audioButtonAnimationExitActive,
          }}
        >
          <button
            className={styles.audioButton}
            onClick={async () => {
              setAnimationButton((prev) => !prev);
              await playWord();
            }}
          />
        </CSSTransition>
      </div>
    </div>
  );
};

export default AudioQuestion;
