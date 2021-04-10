import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Box, Typography, CardMedia } from '@material-ui/core';
import urls from '../../../../../constants/urls';
import useStyles from './style';
import {
  selectCount,
  selectWords,
  selectRandomWords,
  setAnswer,
  setRandomWords,
  setCount
} from '../../addGameSlice';

export default function Game() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const countCurrent = useSelector(selectCount);
  const words = useSelector(selectWords);
  const randomWords = useSelector(selectRandomWords);

  const clickHandler = (e, i) => {
      if(countCurrent === randomWords[i]) {
        e.target.classList.add(`${classes.correct}`)
      } else {
        const cards = document.querySelectorAll(`.${classes.media}`);
        for (let i = 0; i < cards.length; i++) {
          countCurrent === randomWords[i] ? cards[i].classList.add(`${classes.correct}`)
            : cards[i].classList.add(`${classes.wrong}`)
        }
      }
    }

  const deleteClass = () => {
    const cards = document.querySelectorAll(`.${classes.media}`);
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.remove(`${classes.correct}`)
      cards[i].classList.remove(`${classes.wrong}`)
    }
  }

  return (
    <Container>
        <Box>
          <Typography>{words[countCurrent].question}</Typography>
          <Typography>{words[countCurrent].textExample}</Typography>
        </Box>
        <Box>
        { randomWords.map( (card, i) => (
          <CardMedia
            key={words[randomWords[i]].question}
            className={classes.media}
            image={`${urls.base}/${words[randomWords[i]].image}`}
            onClick={(e) => {
              clickHandler(e, i)
              dispatch(setAnswer(i))
              setTimeout(()=> {
                dispatch(setCount())
                dispatch(setRandomWords());
                deleteClass()
              }, 2000)
            }}
          />)
        )}
        </Box>
    </Container>
  )
}
