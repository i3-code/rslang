import styles from './AudioQuestion.module.css';
import { useSelector } from 'react-redux';
import { selectGetAnswer, selectQuestionNumber, selectQuiz } from '../../../Savannah/savannahSlice';
import urls from '../../../../../constants/urls';
import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const AudioQuestion = () => {
  const questionNumber = useSelector(selectQuestionNumber);
  const quiz = useSelector(selectQuiz);
  const getAnswer = useSelector(selectGetAnswer);

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
        {getAnswer ? (
          <div>
            <div>
              <img
                className={styles.imageQuestion}
                src={`${urls.base}/${quiz[questionNumber].image}`}
                alt={quiz[questionNumber].question}
              />
            </div>
            <div className={styles.wrapperRightAnswer}>
              <button
                className={styles.miniAudioButton}
                onClick={async () => {
                  await playWord();
                }}
              />
              <div>{quiz[questionNumber].question}</div>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default AudioQuestion;
