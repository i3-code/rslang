import styles from './AudioCall.module.css';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import StartGameMenu from '../components/StartGameMenu/StartGameMenu';
import {
  fetchWordsForQuiz,
  resetData,
  restartGame,
  selectLoading,
  selectResult,
  selectRightAnswers,
  selectStart,
  selectStatistics,
  selectWrongAnswers,
  startGame,
} from '../Savannah/savannahSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/partials/Loading';
import ResultGame from '../components/ResultGame/ResultGame';
import urls from '../../../constants/urls';
import AudioCallQuiz from './AudioCallQuiz/AudioCallQuiz';

export default function AudioCall() {
  const dispatch = useDispatch();
  const start = useSelector(selectStart);
  const statistics = useSelector(selectStatistics);

  const rightAnswers = useSelector(selectRightAnswers);
  const wrongAnswers = useSelector(selectWrongAnswers);
  const result = useSelector(selectResult);
  const loading = useSelector(selectLoading);
  let history = useHistory();

  useEffect(() => {
    if (start) {
      (async () => {
        await dispatch(fetchWordsForQuiz(urls.words.all));
      })();
    }

    return () => {
      let currentPath = history.location.pathname.split('/');
      currentPath = currentPath[currentPath.length - 1];
      if (currentPath !== 'audiocall') {
        dispatch(resetData());
      }
    };
  }, [start, dispatch, history]);

  return (
    <div
      className={styles.audioCallBackground}
      style={{ backgroundImage: `url(https://wallpaperaccess.com/full/638019.jpg)` }}
    >
      <div className={styles.audioCallWrapper}>
        <div className={styles.audioCall}>
          {start ? (
            loading ? (
              <Loading />
            ) : (
              <AudioCallQuiz />
            )
          ) : statistics ? (
            <ResultGame
              rightAnswers={rightAnswers}
              wrongAnswers={wrongAnswers}
              restartGame={() => dispatch(restartGame())}
              result={result}
            />
          ) : (
            <StartGameMenu
              title="Аудиовызов"
              note="Тренировка улучшает восприятие речи на слух."
              startGame={() => dispatch(startGame())}
              colorText="#deb887"
              colorTextButton="#fff"
              colorButtonBackground="#deb887"
            />
          )}
        </div>
      </div>
    </div>
  );
}
