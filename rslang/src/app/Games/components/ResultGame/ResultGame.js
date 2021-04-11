import styles from './ResultGame.module.css';
import { NavLink } from 'react-router-dom';
import urls from '../../../../constants/urls';

const ResultGame = ({ rightAnswers, wrongAnswers, restartGame, result }) => {
  const playWord = async (word) => {
    await new Audio(`${urls.base}/${word.audio}`).play();
  };
  console.log(wrongAnswers)

  const ResultWord = ({ word }) => {
    return (
      <div className={styles.answerWrapper}>
        <span className={styles.wrapperAnswerAudio}>
          <div className={styles.answerAudio} onClick={() => playWord(word)} />
        </span>
        <div className={styles.answerEng}>{word.question}</div>
        <span className={styles.answerTr}> — </span>
        <div className={styles.answerTrans}>{word.rightAnswer}</div>
      </div>
    );
  };

  return (
    <div className={styles.wrapperResultGame}>
      <div className={styles.resultPercent}>Ваш результат {result}%</div>
      <div className={styles.resultGameAnswers}>
        <div className={styles.wrapperAnswers}>
          <div className={`${styles.resultAnswers} ${styles.wrong}`}>
            <span>Ошибок: </span>
            {wrongAnswers.length}
          </div>
          {wrongAnswers.map((word, index) => (
            <ResultWord key={index} word={word} />
          ))}
          <div className={styles.answersLine} />
          <div className={`${styles.resultAnswers} ${styles.right}`}>
            <span>Знаю: </span>
            {rightAnswers.length}
          </div>
          {rightAnswers.map((word, index) => (
            <ResultWord key={index} word={word} />
          ))}
        </div>
      </div>
      <div className={styles.buttonContinue} onClick={() => restartGame()}>
        Продолжить тренировку
      </div>
      <NavLink className={styles.buttonBack} to="/games">
        К списку тренировок
      </NavLink>
    </div>
  );
};

export default ResultGame;
