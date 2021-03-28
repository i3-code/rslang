import React from 'react';
import useStyles from './style';
import useSound from 'use-sound';
import { useSelector, useDispatch } from 'react-redux';
import {setHardWords, setDeletedWords, hardWords } from '../../../../../appSlice';
import { translation, page, group, displayActions } from '../../../bookSlice';

import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Tooltip } from '@material-ui/core';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import DeleteIcon from '@material-ui/icons/Delete';

const storageInfoWords = localStorage.getItem('words') ? JSON.parse(localStorage.getItem('words'))
: {deletedWords: {}, hardWords: {}}

export default function Word({currentWord}) {
  const {id, audio, audioMeaning, audioExample, image, word, transcription, wordTranslate, textMeaning, textMeaningTranslate,
    textExample, textExampleTranslate} = currentWord;
  const classes = useStyles();

  const dispatch = useDispatch();
  const hardWordsList = useSelector(hardWords);
  const showTranslation = useSelector(translation);
  const pageNum = useSelector(page);
  const groupNum = useSelector(group);
  const showActions = useSelector(displayActions);

  const createMarkup = (text) => {
    return {__html: text};
  }

  const [playExample] = useSound(
    `https://raw.githubusercontent.com/i3-code/react-rslang-be/main/${audioExample}`,
  );

  const [playMeaning] = useSound(
    `https://raw.githubusercontent.com/i3-code/react-rslang-be/main/${audioMeaning}`, {
      onend: () => {
        setTimeout(playExample, 1000);
      },
    }
  );

  const [playActive, audioData] = useSound(
    `https://raw.githubusercontent.com/i3-code/react-rslang-be/main/${audio}`, {
      onend: () => {
        const {isPlaying, stop} = audioData;
        if (isPlaying) stop();
        setTimeout(playMeaning, 1000);
      }
    },
  );

  const isHard = () => {
    return (hardWordsList[pageNum] && hardWordsList[pageNum].includes(id))
  }

  const borderColor = {
    0: 'blue',
    1: 'turquoise',
    2: 'orange',
    3: 'pink',
    4: 'violet',
    5: 'yellow',
  }

  return (
    <Card className={`${classes.root} ${ isHard() ? classes.hard : ''} ${classes[borderColor[groupNum]]}`}>
      <CardMedia
        className={classes.media}
        image={`https://raw.githubusercontent.com/i3-code/react-rslang-be/main/${image}`}
      />
      <div className={classes.contentWrapper}>
        <CardContent className={classes.content}>
          <Typography className={classes.text}>
            <span className={classes.word}>{word}</span>
            <span>{` ${transcription} `}</span>
            {showTranslation && <span>{wordTranslate}</span>}
            <Tooltip title="Звук">
              <IconButton display="inline" onClick={playActive}>
                <VolumeDownIcon />
              </IconButton>
            </Tooltip>
          </Typography>

          <Typography dangerouslySetInnerHTML={createMarkup(textMeaning)} className={classes.text}></Typography>
          {showTranslation && <Typography className={`${classes.bottomLine} ${classes.text}`}>{textMeaningTranslate}</Typography>}

          <Typography dangerouslySetInnerHTML={createMarkup(textExample)} className={classes.text}></Typography>
          {showTranslation && <Typography className={classes.text}>{textExampleTranslate}</Typography>}
        </CardContent>

        <div className={classes.actionsWrapper}>
          {showActions &&
           <CardActions disableSpacing>
            <Tooltip title="В сложные">
              <IconButton onClick={()=> {
                storageInfoWords.hardWords[pageNum] ? storageInfoWords.hardWords[pageNum].push(id)
                : storageInfoWords.hardWords[pageNum] = [id]
                localStorage.setItem('words', JSON.stringify(storageInfoWords))
                dispatch(setHardWords({pageNum, id}))
                }}>
              <img src="https://img.icons8.com/material/24/000000/learning.png" alt='В сложные'/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Удалить">
              <IconButton onClick={ () => {
                storageInfoWords.deletedWords[pageNum] ? storageInfoWords.deletedWords[pageNum].push(id)
                : storageInfoWords.deletedWords[pageNum] = [id]
                localStorage.setItem('words', JSON.stringify(storageInfoWords))
                dispatch(setDeletedWords({pageNum, id}))
              }}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </CardActions>}

          <Typography>Результаты</Typography>
          </div>
      </div>
    </Card>
  )
}
