import styles from './AudioCall.module.css';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import StartGameMenu from '../components/StartGameMenu/StartGameMenu';
import {
  fetchWordsForQuiz,
  resetData,
  restartGame,
  selectDataFromBook,
  selectLoading,
  selectResult,
  selectRightAnswers,
  selectStart,
  selectStatistics,
  selectWrongAnswers,
  setDataFromBook,
  setLevel,
  startGame,
} from '../Savannah/savannahSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/partials/Loading';
import ResultGame from '../components/ResultGame/ResultGame';
import urls from '../../../constants/urls';
import AudioCallQuiz from './AudioCallQuiz/AudioCallQuiz';
import LevelDifficult from '../components/LevelDifficult/LevelDifficult';
import ButtonFullScreen from '../components/ButtonFullScreen/ButtonFullScreen';

export default function AudioCall({ fullScreenHandler, words, nextRoundFromBook }) {
  const dispatch = useDispatch();
  const start = useSelector(selectStart);
  const statistics = useSelector(selectStatistics);

  const rightAnswers = useSelector(selectRightAnswers);
  const wrongAnswers = useSelector(selectWrongAnswers);
  const result = useSelector(selectResult);
  const loading = useSelector(selectLoading);
  const haveDataFromBook = useSelector(selectDataFromBook);
  const setLevelDifficult = (value) => {
    dispatch(setLevel(value));
  };
  let history = useHistory();

  let nextRoundStart = () => {
    dispatch(restartGame());
  };

  useEffect(() => {
    if (words.length) {
      dispatch(setDataFromBook(true));
      // eslint-disable-next-line
      nextRoundStart = () => {
        dispatch(restartGame());
        nextRoundFromBook();
      };
    }
    if (start) {
      (async () => {
        await dispatch(fetchWordsForQuiz(urls.words.all, words));
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
          <ButtonFullScreen
            color="invert(58%) sepia(91%) saturate(2823%) hue-rotate(190deg) brightness(99%) contrast(104%)"
            fullScreenHandler={fullScreenHandler}
          />
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
              restartGame={() => nextRoundStart()}
              result={result}
            />
          ) : (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
              <StartGameMenu
                title="Аудиовызов"
                note="Тренировка улучшает восприятие речи на слух."
                startGame={() => dispatch(startGame())}
                colorText="#4099ff"
                colorTextButton="#fff"
                colorButtonBackground="#4099ff"
              />
              {haveDataFromBook ? '' : <LevelDifficult setLevel={setLevelDifficult} color="#4099ff" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
