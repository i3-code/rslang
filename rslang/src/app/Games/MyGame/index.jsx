import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';

import useStyles from './styles';

import ResultGame from '../components/ResultGame/ResultGame';
import StartGameMenu from '../components/StartGameMenu/StartGameMenu';
import Logic from './Logic';
import LevelDifficult from '../components/LevelDifficult/LevelDifficult';
import {
  selectFinish,
  restartGame,
  selectIsGame,
  setGameTrue,
  selectRightAnswers,
  selectWrongAnswers,
  selectResult,
  setLevelMyGame,
  resetData,
  selectDataFromBook,
  setPageNum,
  setDataFromBook,
} from './myGameSlice';

export default function MyGame() {
  const dispatch = useDispatch();
  let history = useHistory();
  const classes = useStyles();
  const result = useSelector(selectResult);
  const finish = useSelector(selectFinish);
  const rightAnswers = useSelector(selectRightAnswers);
  const wrongAnswers = useSelector(selectWrongAnswers);
  const game = useSelector(selectIsGame);
  const haveDataFromBook = useSelector(selectDataFromBook);

  useEffect(() => {
    const params = new URLSearchParams(history.location.search);
    const groupNum = params.get('groupNum');
    const pageNum = params.get('pageNum');
    if (groupNum && pageNum) {
      dispatch(setLevelMyGame(groupNum));
      dispatch(setPageNum(pageNum));
      dispatch(setDataFromBook(true));
      history.replace(history.location.pathname);
    }
    return () => {
      let currentPath = history.location.pathname.split('/');
      currentPath = currentPath[currentPath.length - 1];
      if (currentPath !== 'sort') {
        dispatch(resetData());
      }
    };
  }, [dispatch, history]);

  return (
    <Container className={classes.root}>
      {game ? (
        <Logic />
      ) : finish ? (
        <ResultGame
          rightAnswers={rightAnswers}
          wrongAnswers={wrongAnswers}
          restartGame={() => dispatch(restartGame())}
          result={result}
        />
      ) : (
        <Grid style={{ textAlign: 'center' }}>
          <StartGameMenu
            title="Сортировка"
            note="Тренировка Сортировка развивает словарный запас. Чем больше предложений составишь правильно, тем больше очков опыта получишь."
            startGame={() => dispatch(setGameTrue())}
            colorText="#F0FEF9"
            colorTextButton="#fff"
            colorButtonBackground="#2ed8b6"
          />
          {!haveDataFromBook && <LevelDifficult color="#F0FEF9" setLevel={setLevelMyGame} />}
        </Grid>
      )}
    </Container>
  );
}
