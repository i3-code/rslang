import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, IconButton } from '@material-ui/core';
import { VolumeUp, VolumeOff } from '@material-ui/icons';
import Loading from '../../../../components/partials/Loading';
import urls from '../../../../constants/urls';
import LinearDeterminate from '../../components/LinearDeterminate/LinearDeterminate';
import Circular from '../../components/Circular/Circular';
import useStyles from './style';
import GameField from './GameField';
import {
  setMute,
  setResult,
  finishLoading,
  setFinishTrue,
  setGameFalse,
  selectCount,
  selectPercentRightAnswers,
  selectLoading,
  selectLevel,
  selectPageNum,
  selectMute,
  fetchWords,
  selectWords,
  setRandomWords,
  selectProgress,
} from '../addGameSlice';

export default function Game() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const count = useSelector(selectCount);
  const pageNum = useSelector(selectPageNum);
  const level = useSelector(selectLevel);
  const loading = useSelector(selectLoading);
  const mute = useSelector(selectMute);
  const words = useSelector(selectWords);
  const progress = useSelector(selectProgress);
  const percentRightAnswers = useSelector(selectPercentRightAnswers);

  useEffect(() => {
    (async () => {
      await dispatch(fetchWords(urls.words.all));
    })();
  }, [level, pageNum, dispatch]);

  useEffect(() => {
    if (words !== null) {
      dispatch(finishLoading());
      dispatch(setRandomWords());
    }
  }, [words, dispatch]);

  useEffect(() => {
    if (words === null) return;
    if (count === words.length) {
      dispatch(setResult());
      dispatch(setFinishTrue());
      dispatch(setGameFalse());
    }
  }, [count, words, dispatch]);

  return (
    <Container className={classes.root}>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <LinearDeterminate progress={progress} />
          <IconButton onClick={() => dispatch(setMute())} className={classes.btn}>
            {mute ? <VolumeOff /> : <VolumeUp />}
          </IconButton>
          <GameField />
          <Circular percentRightAnswers={percentRightAnswers} />
        </Container>
      )}
    </Container>
  );
}
