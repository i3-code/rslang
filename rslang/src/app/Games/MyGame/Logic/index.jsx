import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Grid } from '@material-ui/core';

import urls from '../../../../constants/urls';
import Loading from '../../../../components/partials/Loading';
import Sentence from './Sentence';
import LinearDeterminate from '../../components/LinearDeterminate/LinearDeterminate';
import Circular from "../../components/Circular/Circular";

import {
  selectCount,
  setFinishTrue,
  setGameFalse,
  setResult,
  selectAnswer,
  selectSentences,
  selectPercentRightAnswers,
  selectCheck,
  selectLoading,
  finishLoading,
  fetchSentences,
  selectLevel,
  selectPageNum,
  setCurrentSentences,
  selectCurrentSentences,
  setLearningWord,
  selectProgress,
} from '../myGameSlice';

import useStyles from './styles';

export default function Logic() {
  const classes = useStyles();
  const count = useSelector(selectCount);
  const pageNum = useSelector(selectPageNum);
  const level = useSelector(selectLevel);
  const sentences = useSelector(selectSentences);
  const answer = useSelector(selectAnswer);
  const check = useSelector(selectCheck);
  const loading = useSelector(selectLoading);
  const currentSentences = useSelector(selectCurrentSentences);
  const sentenceRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(fetchSentences(urls.words.all));
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
        <Grid container direction="column" alignItems="center" width="100%">
          <LinearDeterminate selectProgress={selectProgress}/>
            <Grid  className={classes.answer}>
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
          <Sentence sentenceRef={sentenceRef} />
          <Circular selectPercentRightAnswers={selectPercentRightAnswers}/>
        </Grid>
      )}
    </Container>
  );
}
