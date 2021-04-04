import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Grid, CardMedia } from '@material-ui/core';

import urls from '../../../../constants/urls';
import Loading from '../../../../components/partials/Loading';
import Sentence from './Sentence';
import {
  selectCount,
  setFinishTrue,
  setGameFalse,
  setResult,
  selectRightAnswers,
  selectAnswer,
  selectSentences,
  selectCheck,
  selectLoading,
  finishLoading,
  fetchSentences,
  selectLevel,
  selectPageNum,
  setCurrentSentences,
  selectCurrentSentences,
  setLearningWord,
  selectMute,
  setMute,
} from '../myGameSlice';

import useStyles from './styles';

export default function Logic() {
  const classes = useStyles();
  const count = useSelector(selectCount);
  const pageNum = useSelector(selectPageNum);
  const level = useSelector(selectLevel);
  const rightAnswers = useSelector(selectRightAnswers);
  const sentences = useSelector(selectSentences);
  const answer = useSelector(selectAnswer);
  const check = useSelector(selectCheck);
  const loading = useSelector(selectLoading);
  const currentSentences = useSelector(selectCurrentSentences);
  const sentenceRef = useRef(null);
  const mute = useSelector(selectMute);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(fetchSentences(`${urls.words}?group=${level}&page=${pageNum - 1}`));
    })();
  }, [level, pageNum, dispatch]);

  useEffect(() => {
    if (currentSentences !== null) {
      dispatch(finishLoading());
    }
  }, [currentSentences, dispatch]);

  useEffect(() => {
    if (count === null) return;
    if (sentences === null) return;
    if (count === sentences.length) {
      dispatch(setResult());
      dispatch(setFinishTrue());
      dispatch(setGameFalse());
    } else {
      dispatch(setCurrentSentences(sentences[count].textExample.replace(/<\/?[^>]+(>|$)/g, '')));
      dispatch(setLearningWord(sentences[count].question));
    }
  }, [count, sentences, dispatch]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Grid container direction="row" justify="space-between" className={classes.statictic}>
            <Grid>Текущий уровень: {level + 1}</Grid>
            <Grid className={classes.answer}>
              {check &&
                (answer ? (
                  <Grid className={classes.answer} style={{ color: 'green' }}>
                    Верно!
                  </Grid>
                ) : (
                  <Grid className={classes.answer} style={{ color: 'red' }}>
                    Не верно!
                  </Grid>
                ))}
            </Grid>
            <Grid>Счет: {rightAnswers.length}</Grid>
            <Grid onClick={() => dispatch(setMute())}>
              {mute ? (
                <CardMedia className={classes.media} image={'./images/unmute.svg'} />
              ) : (
                <CardMedia className={classes.media} image={'./images/mute.svg'} />
              )}
            </Grid>
          </Grid>
          <Sentence sentenceRef={sentenceRef} />
        </Container>
      )}
    </Container>
  );
}
