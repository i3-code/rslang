import React from 'react';
import useStyles from './style';
import useSound from 'use-sound';
import { useSelector, useDispatch } from 'react-redux';
import {setHardWords, setDeletedWords, hardWords } from '../../../../../appSlice';
import { translation, page, displayActions } from '../../../bookSlice';

import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Tooltip } from '@material-ui/core';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Word({currentWord}) {
  const {id, audio, audioMeaning, audioExample, image, word, transcription, wordTranslate, textMeaning, textMeaningTranslate,
    textExample, textExampleTranslate} = currentWord;
  const classes = useStyles();

  const dispatch = useDispatch();
  const hardWordsList = useSelector(hardWords);
  const showTranslation = useSelector(translation);
  const pageNum = useSelector(page);
  const showActions = useSelector(displayActions);

  const createMarkup = (text) => {
    return {__html: text};
  }

  const [playMeaning] = useSound(
    `https://raw.githubusercontent.com/i3-code/react-rslang-be/main/${audioMeaning}`, {
      onend: () => {
        playExample()
      },
    }
  )

  const [playActive] = useSound(
    `https://raw.githubusercontent.com/i3-code/react-rslang-be/main/${audio}`, {
      onend: () => {
        playMeaning()
      }
    },
  )

  const [playExample] = useSound(
    `https://raw.githubusercontent.com/i3-code/react-rslang-be/main/${audioExample}`,
  )

  const isHard = () => {
    return (hardWordsList[pageNum] && hardWordsList[pageNum].includes(id))
  }

  return (
    <Card className={`${classes.root} ${ isHard() ? classes.hard : ''}`}>
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
              <IconButton onClick={()=> {dispatch(setHardWords({pageNum, id}))}}>
              <img src="https://img.icons8.com/material/24/000000/learning.png" alt='В сложные'/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Удалить">
              <IconButton onClick={ () => {dispatch(setDeletedWords({pageNum, id}))}}>
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
