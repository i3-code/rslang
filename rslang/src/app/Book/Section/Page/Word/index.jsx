import React, { useEffect, useState } from 'react';
import useStyles from './style';
import useSound from 'use-sound';
import { useSelector, useDispatch } from 'react-redux';
import {setHardWords, setDeletedWords, hardWords } from '../../../../../appSlice';
import { translation, page, group, displayActions } from '../../../bookSlice';

import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Tooltip } from '@material-ui/core';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import DeleteIcon from '@material-ui/icons/Delete';

import urls from '../../../../../constants/urls';

const storageInfoWords = localStorage.getItem('words') ? JSON.parse(localStorage.getItem('words'))
: {deletedWords: {}, hardWords: {}}

export default function Word({currentWord}) {
  const {id, audio, audioMeaning, audioExample, image, word, transcription, wordTranslate, textMeaning, textMeaningTranslate,
    textExample, textExampleTranslate} = currentWord;

  const dispatch = useDispatch();
  const hardWordsList = useSelector(hardWords);
  const showTranslation = useSelector(translation);
  const pageNum = useSelector(page);
  const groupNum = useSelector(group);
  const showActions = useSelector(displayActions);

  const classes = useStyles();

  const [isAudio, setIsAudio] = useState(false);
  const [isAudioMeaning, setIsAudioMeaning] = useState(false);
  const [isAudioExample, setIsAudioExample] = useState(false);

  const soundPrefix = urls.base;
  const [playAudioExample, playAudioExampleData] = useSound(`${soundPrefix}/${audioExample}`);
  const [playAudioMeaning, playAudioMeaningData] = useSound(`${soundPrefix}/${audioMeaning}`, {onend: ()=> setIsAudioExample(true)});
  const [playAudio, playAudioData] = useSound(`${soundPrefix}/${audio}`, {onend: ()=> setIsAudioMeaning(true)});


  useEffect(() => {
    const { isPlaying, stop } = playAudioData;
    if (isAudio) {
      if (isPlaying) stop();
      playAudio();
      setIsAudio(false);
    }

    return () => {
      if (isPlaying) stop();
    };
  }, [isAudio, playAudio, playAudioData]);

  useEffect(() => {
    const { isPlaying, stop } = playAudioMeaningData;
    if (isAudioMeaning) {
      if (isPlaying) stop();
      playAudioMeaning();
      setIsAudioMeaning(false);
    }

    return () => {
      if (isPlaying) stop();
    };
  }, [isAudioMeaning, playAudioMeaning, playAudioMeaningData]);

  useEffect(() => {
    const { isPlaying, stop } = playAudioExampleData;
    if (isAudioExample) {
      if (isPlaying) stop();
      playAudioExample();
      setIsAudioExample(false);
    }

    return () => {
      if (isPlaying) stop();
    };
  }, [isAudioExample, playAudioExample, playAudioExampleData]);

  const handleAudio = () => {
    setIsAudio(true);
  }

  const createMarkup = (text) => {
    return {__html: text};
  }

  const isHard = () => {
    return (hardWordsList[pageNum] && hardWordsList[pageNum].includes(id));
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
        image={`${urls.base}/${image}`}
      />
      <div className={classes.contentWrapper}>
        <CardContent className={classes.content}>
          <Typography className={classes.text}>
            <span className={classes.word}>{word}</span>
            <span>{` ${transcription} `}</span>
            {showTranslation && <span>{wordTranslate}</span>}
            <Tooltip title="Озвучить">
              <IconButton display="inline" onClick={handleAudio}>
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
