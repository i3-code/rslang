import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Box, IconButton, Button, Typography, Grid, CardMedia } from '@material-ui/core';
import {VolumeUp, VolumeOff} from '@material-ui/icons';
import Loading from '../../../../components/partials/Loading';
import urls from '../../../../constants/urls';
import useStyles from './style';
import GameField from './GameField';
import {
  setMute,
  setResult,
  finishLoading,
  setFinishTrue,
  setGameFalse,
  selectCount,
  selectRightAnswers,
  selectAnswer,
  selectLoading,
  selectLevel,
  selectPageNum,
  selectMute,
  fetchWords,
  selectWords,
  setRandomWords,
} from '../addGameSlice';

export default function Game() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const count = useSelector(selectCount);
  const pageNum = useSelector(selectPageNum);
  const level = useSelector(selectLevel);
  const rightAnswers = useSelector(selectRightAnswers);
  const answer = useSelector(selectAnswer);
  const loading = useSelector(selectLoading);
  const mute = useSelector(selectMute);
  const currentWords = useSelector(selectWords);

  useEffect(() => {
    (async () => {
      await dispatch(fetchWords(`${urls.words.all}?group=${level}&page=${pageNum - 1}`));
    })();
  }, [level, pageNum, dispatch]);

  useEffect(() => {
    if (currentWords !== null) {
      dispatch(finishLoading());
      dispatch(setRandomWords());
    }
  }, [currentWords , dispatch]);

  useEffect(() => {
    if (count === null) return;
    if (currentWords === null) return;
    console.log(count, currentWords.length)
    if (count === currentWords.length) {
      dispatch(setResult());
      dispatch(setFinishTrue());
      dispatch(setGameFalse());
    }
  }, [count, currentWords, dispatch]);

  return (
    <Container>
      { loading ? (
       <Loading />
      ) : (
      <Container>
         <IconButton onClick={() => dispatch(setMute())}>
            {mute ? <VolumeOff /> : <VolumeUp />}
          </IconButton>
          <Typography>Уровень: {level + 1}</Typography>
          <Typography>Счет: 1</Typography>
          <GameField/>
      </Container>
     )}
  </Container>
  )
}
