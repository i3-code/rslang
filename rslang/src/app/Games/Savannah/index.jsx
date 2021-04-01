import styles from './Savannah.module.css';
import urls from '../../../constants/urls';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SavannahQuiz from './SavannahQuiz/SavannahQuiz';
import Loading from '../../../components/partials/Loading';
import StartGameMenu from '../components/StartGameMenu/StartGameMenu';
import ResultGame from '../components/ResultGame/ResultGame';
import {
  fetchWordsForQuiz,
  selectTimer,
  selectLoading,
  selectStart,
  selectStatistics,
  nextRound,
  incrementTimer,
  selectRightAnswers,
  selectWrongAnswers,
  restartGame,
  selectResult,
  startGame,
  selectGuardAllowed,
  timeFinished,
} from './savannahSlice';

export default function Savannah() {
  const dispatch = useDispatch();
  const TIMER_LIMIT = 7;

  const timer = useSelector(selectTimer);
  const start = useSelector(selectStart);
  const statistics = useSelector(selectStatistics);

  const rightAnswers = useSelector(selectRightAnswers);
  const wrongAnswers = useSelector(selectWrongAnswers);
  const result = useSelector(selectResult);
  const guardAllowed = useSelector(selectGuardAllowed);

  useEffect(() => {
    (async () => {
      await dispatch(fetchWordsForQuiz(urls.words.all));
    })();
  }, [statistics, dispatch]);

  useEffect(() => {
    if (start) {
      const intervalIdTimer = setInterval(() => {
        dispatch(incrementTimer());
      }, 1000);

      return () => clearInterval(intervalIdTimer);
    }
  }, [start, dispatch]);

  // useEffect(() => {
  //   if (timer >= TIMER_LIMIT && guardAllowed) {
  //     dispatch(timeFinished());
  //     dispatch(nextRound());
  //   }
  // }, [timer, dispatch, guardAllowed]);

  return (
    <div
      className={styles.savannahBackground}
      style={{ backgroundImage: `url(https://searchthisweb.com/wallpaper/african-savanna_2880x1800_y526q.jpg)` }}
    >
      <div className={styles.savannahWrapper}>
        <div className={styles.savannah}>
          {useSelector(selectLoading) ? (
            <Loading />
          ) : start ? (
            <SavannahQuiz />
          ) : statistics ? (
            <ResultGame
              rightAnswers={rightAnswers}
              wrongAnswers={wrongAnswers}
              restartGame={() => dispatch(restartGame())}
              result={result}
            />
          ) : (
            <StartGameMenu
              title="Саванна"
              note="Тренировка Саванна развивает словарный запас. Чем больше слов ты знаешь, тем больше очков опыта получишь."
              startGame={() => dispatch(startGame())}
              colorText="#00c49d"
              colorTextButton="#fff"
              colorButtonBackground="#00c49d"
            />
          )}
        </div>
      </div>
    </div>
  );
}
