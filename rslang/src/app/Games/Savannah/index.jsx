import './Savannah.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SavannahQuiz from './SavannahQuiz/SavannahQuiz';
import Loading from '../../../components/partials/Loading';
import ResultGame from './ResultGame/ResultGame';
import StartGameMenu from './StartGameMenu/StartGameMenu';
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
} from './savannahSlice';

import urls from '../../../constants/urls';

export default function Savannah() {
  const dispatch = useDispatch();
  const TIMER_LIMIT = 7;

  const timer = useSelector(selectTimer);
  const start = useSelector(selectStart);
  const statistics = useSelector(selectStatistics);

  const rightAnswers = useSelector(selectRightAnswers);
  const wrongAnswers = useSelector(selectWrongAnswers);
  const result = useSelector(selectResult);

  useEffect(() => {
    (async () => {
      await dispatch(fetchWordsForQuiz(urls.words));
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

  useEffect(() => {
    if (timer >= TIMER_LIMIT) {
      dispatch(nextRound());
    }
  }, [timer, dispatch]);

  return (
    <div
      className="savannah-background"
      style={{ backgroundImage: `url(https://searchthisweb.com/wallpaper/african-savanna_2880x1800_y526q.jpg)` }}
    >
      <div className="savannah-wrapper">
        <div className="savannah">
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
