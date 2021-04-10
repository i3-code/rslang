import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ResultGame from '../components/ResultGame/ResultGame';
import StartGameMenu from '../components/StartGameMenu/StartGameMenu';
import LevelDifficult from '../components/LevelDifficult/LevelDifficult';
import {
  selectFinish,
  restartGame,
  selectIsGame,
  setGameTrue,
  selectRightAnswers,
  selectWrongAnswers,
  selectResult,
  setLevelAddGame,
  selectDataFromBook,
  setPageNum,
  setDataFromBook,
  resetData
} from './addGameSlice';

import useStyles from './style';
import Game from './Game';

export default function AdditionalGame(props) {
  const dispatch = useDispatch();
  let history = useHistory();
  const result = useSelector(selectResult);
  const finish = useSelector(selectFinish);
  const rightAnswers = useSelector(selectRightAnswers);
  const wrongAnswers = useSelector(selectWrongAnswers);
  const game = useSelector(selectIsGame);
  const haveDataFromBook = useSelector(selectDataFromBook);
  const setLevelDifficult = (value) => {
    dispatch(setLevelAddGame(value));
  };

  const classes = useStyles();

  useEffect(() => {
    const params = new URLSearchParams(history.location.search);
    const groupNum = params.get('groupNum');
    const pageNum = params.get('pageNum');
    if (groupNum && pageNum) {
      dispatch(setLevelAddGame(groupNum));
      dispatch(setPageNum(pageNum));
      dispatch(setDataFromBook(true));
      history.replace(history.location.pathname);
    }
    return () => {
      let currentPath = history.location.pathname.split('/');
      currentPath = currentPath[currentPath.length - 1];
      if (currentPath !== 'pictures') {
        dispatch(resetData());
      }
    };
  }, [dispatch, history]);

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Container>
        { game ? (
            <Game/>
          )
          : finish ? (
          <ResultGame
            rightAnswers={rightAnswers}
            wrongAnswers={wrongAnswers}
            restartGame={() => dispatch(restartGame())}
            result={result}
          />
        ) : (
          <Grid style={{ textAlign: 'center', marginTop: '100px' }}>
            <StartGameMenu
              title="Картинки"
              note="Тренировка Картинки помогает визуализировать английские слова."
              startGame={() => dispatch(setGameTrue())}
              colorText="#C882E2"
              colorTextButton="#fff"
              colorButtonBackground="#C882E2"
            />
            {!haveDataFromBook && <LevelDifficult color="#C882E2" setLevel={setLevelDifficult} />}
          </Grid>
        )}
        </Container>
      </div>
    </div>
  )
}
