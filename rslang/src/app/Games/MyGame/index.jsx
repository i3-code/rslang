import { useSelector, useDispatch } from 'react-redux';
import { Container, Box, Button, Grid } from '@material-ui/core';

import useStyles from './styles';

import ResultGame from '../components/ResultGame/ResultGame';
import StartGameMenu from '../components/StartGameMenu/StartGameMenu';
import Logic from './Logic';
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
} from './myGameSlice';

export default function MyGame(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const result = useSelector(selectResult);
  const finish = useSelector(selectFinish);
  const rightAnswers = useSelector(selectRightAnswers);
  const wrongAnswers = useSelector(selectWrongAnswers);
  const game = useSelector(selectIsGame);
  const chooseLevel = useSelector(chooseLevelRedux);

  const levelNumber = [
    'linear-gradient(45deg,#4099ff,#73b4ff',
    'linear-gradient(45deg,#2ed8b6,#59e0c5)',
    'linear-gradient(45deg,#FFB64D,#ffcb80)',
    'linear-gradient(45deg,#FF5370,#ff869a)',
    'linear-gradient(45deg,#C882E2,#C376DF)',
    'linear-gradient(45deg,#F9F53E,#FBF969)',
  ];

  const changeLevel = (e) => {
    dispatch(setLevel(e));
    dispatch(setChooseLevelFalse());
  };

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
            <Logic />
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
          title="Сортировка"
          note="Тренировка Сортировка развивает словарный запас. Чем больше предложений составишь правильно, тем больше очков опыта получишь."
          startGame={() => dispatch(setGameTrue())}
          colorText="#73b4ff"
          colorTextButton="#fff"
          colorButtonBackground="#73b4ff"
        />
      )}
    </Container>
  );
}
