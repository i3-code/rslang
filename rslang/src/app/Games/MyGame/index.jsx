import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { Container, Box, Button, Grid } from '@material-ui/core';

import useStyles from './styles';

import { shuffle } from '../../../functions/math';
import urls from '../../../constants/urls';
import Loading from '../../../components/partials/Loading';
import Sentence from './Sentence';
import ResultGame from '../components/ResultGame/ResultGame';

export default function MyGame(props) {
  const classes = useStyles();
  const [rightAnswers, setRightAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [check, setCheck] = useState(false);
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sentences, setSentences] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [level, setLevel] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [finish, setFinish] = useState(false);
  const [count, setCount] = useState(null);
  const [currentSentences, setCurrentSentences] = useState(null);
  const sentenceRef = useRef(null);
  const levelNumber = [
    'linear-gradient(45deg,#4099ff,#73b4ff',
    'linear-gradient(45deg,#2ed8b6,#59e0c5)',
    'linear-gradient(45deg,#FFB64D,#ffcb80)',
    'linear-gradient(45deg,#FF5370,#ff869a)',
    'linear-gradient(45deg,#C882E2,#C376DF)',
    'linear-gradient(45deg,#F9F53E,#FBF969)',
  ];

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${urls.words}?group=${level}&page=${pageNum - 1}`)
        .then((response) => {
          setSentences(shuffle(response.data));
        })
        .catch((error) => console.log(error));
    };
    fetchData();
  }, [level, pageNum]);

  useEffect(() => {
    if (sentences !== null) {
      sentences.map((el) =>
        setWrongAnswers((prev) => [
          ...prev,
          {
            question: el.word,
            rightAnswer: el.wordTranslate,
            audio: el.audio,
          },
        ]),
      );
      setCount(0);
    }
  }, [sentences]);

  useEffect(() => {
    if (currentSentences !== null) {
      setLoading(false);
    }
  }, [currentSentences]);

  useEffect(() => {
    setCheck(false);
    setAnswer(false);
    if (count === null) return;
    if (sentences === null) return;
    if (count === sentences.length - 1) setFinish(true);
    setCurrentSentences(sentences[count].textExample.replace(/<\/?[^>]+(>|$)/g, ''));
  }, [count, sentences]);

  const restartGame = () => {
    setLoading(true);
    setCount(0);
    setResult(0);
    setWrongAnswers([]);
    setRightAnswers([]);
    setFinish(false);
    if (pageNum < 31) {
      setPageNum((prev) => prev + 1);
    } else if (level < 7) {
      setLevel((prev) => prev + 1);
    } else {
      setPageNum(1);
      setLevel(0);
    }
  };

  const onCheck = useCallback(
    (words) => {
      setCheck(true);
      if (words.join(' ') === currentSentences) {
        setAnswer(true);
        setResult((prev) => prev + 5);
        setRightAnswers((prev) => [
          ...prev,
          {
            question: sentences[count].word,
            rightAnswer: sentences[count].wordTranslate,
            audio: sentences[count].audio,
          },
        ]);
        setWrongAnswers((prev) => prev.filter((el) => el.question !== sentences[count].word));
      } else {
        setAnswer(false);
      }
    },
    [currentSentences, sentences, count],
  );

  const onClickNext = () => {
    if (count < sentences.length - 1) {
      setCount(count + 1);
    } else {
      setLoading(true);
    }
  };

  return (
    <Container>
      {finish ? (
        <ResultGame
          rightAnswers={rightAnswers}
          wrongAnswers={wrongAnswers}
          restartGame={() => restartGame()}
          result={result}
        />
      ) : loading ? (
        <Loading />
      ) : (
        <Box className={classes.root}>
            <Grid className={classes.currentLevel}>Текущий уровень: {level+1}</Grid>
          <Sentence
            sentenceSplit={shuffle(currentSentences.split(' '))}
            onCheck={onCheck}
            onClickNext={onClickNext}
            sentenceRef={sentenceRef}
            currentSentences={currentSentences}
            check={check}
            answer={answer}
          />
          <Grid className={classes.level}>
            {levelNumber.map((el, i) => (
              <Button className={classes.button} key={i} style={{ background: el }} onClick={() => setLevel(i)}>
                Уровень {i + 1}
              </Button>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
