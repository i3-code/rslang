import './Savannah.css';
import { useEffect } from 'react';
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
} from './savannahSlice';

import urls from '../../../constants/urls';

const Savannah = () => {
  const dispatch = useDispatch();
  const TIMER_LIMIT = 7;

  const timer = useSelector(selectTimer);
  const start = useSelector(selectStart);
  const statistics = useSelector(selectStatistics);

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
            <ResultGame />
          ) : (
            <StartGameMenu />
          )}
        </div>
      </div>
    </div>
  );
};

export default Savannah;
