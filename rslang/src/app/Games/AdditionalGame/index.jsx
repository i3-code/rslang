import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Box, Button, Grid } from '@material-ui/core';
import ResultGame from '../components/ResultGame/ResultGame';
import StartGameMenu from '../components/StartGameMenu/StartGameMenu';
import {
  selectFinish,
  restartGame,
  selectIsGame,
  setGameTrue,
  selectRightAnswers,
  selectWrongAnswers,
  selectResult,
  setLevel,
  chooseLevelRedux,
  setChooseLevelFalse,
} from './addGameSlice';

import useStyles from './style';
import Game from './Game';

export default function AdditionalGame(props) {
  const dispatch = useDispatch();
  const result = useSelector(selectResult);
  const finish = useSelector(selectFinish);
  const rightAnswers = useSelector(selectRightAnswers);
  const wrongAnswers = useSelector(selectWrongAnswers);
  const game = useSelector(selectIsGame);
  const chooseLevel = useSelector(chooseLevelRedux);

  const classes = useStyles();

  const levelNumber = [
    'linear-gradient(45deg,#4099ff,#73b4ff',
    'linear-gradient(45deg,#2ed8b6,#59e0c5)',
    'linear-gradient(45deg,#FFB64D,#ffcb80)',
    'linear-gradient(45deg,#FF5370,#ff869a)',
    'linear-gradient(45deg,#C882E2,#C376DF)',
    'linear-gradient(45deg,#F9F53E,#FBF969)',
  ];

  const changeLevel = (num) => {
    dispatch(setLevel(num));
    dispatch(setChooseLevelFalse());
  };

  useEffect(() => {
    if (finish) {
      console.log(wrongAnswers)}
  }, [finish]);

  return (
      <Container className={classes.root}>
      {game ? (
        <Box className={classes.root}>
          {chooseLevel ? (
            <Grid className={classes.level}>
              <Grid className={classes.chooseLevel}>Выберите уровень сложности:</Grid>
              {levelNumber.map((el, i) => (
                <Button className={classes.button} key={i} style={{ background: el }} onClick={() => changeLevel(i)}>
                  Уровень {i + 1}
                </Button>
              ))}
            </Grid>
          ) : (
            <Game/>
          )}
        </Box>
      ) : finish ? (
        <ResultGame
          rightAnswers={rightAnswers}
          wrongAnswers={wrongAnswers}
          restartGame={() => dispatch(restartGame())}
          result={result}
        />
      ) : (
        <StartGameMenu
          title="Картинки"
          note="Тренировка Картинки помогает визуализировать английские слова."
          startGame={() => dispatch(setGameTrue())}
          colorText="#C882E2"
          colorTextButton="#fff"
          colorButtonBackground="#C882E2"
        />
      )}
    </Container>
  )
}
