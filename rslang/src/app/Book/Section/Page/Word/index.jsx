import React, { useEffect, useState } from 'react';
import useStyles from './style';
import useSound from 'use-sound';
import { useSelector, useDispatch } from 'react-redux';
import {setHardWords, setDeletedWords, hardWords } from '../../../../../redux/appSlice';
import { translate, controls } from '../../../bookSlice';

import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Tooltip } from '@material-ui/core';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import DeleteIcon from '@material-ui/icons/Delete';

import urls from '../../../../../constants/urls';

const borderColor = {
  0: 'blue',
  1: 'turquoise',
  2: 'orange',
  3: 'pink',
  4: 'violet',
  5: 'yellow',
};

export default function Word({currentWord, canPlay, setCanPlay}) {
  const {id, audio, audioMeaning, audioExample, image, word, transcription, wordTranslate, textMeaning, textMeaningTranslate,
    textExample, textExampleTranslate, group: groupNum, page: pageNum} = currentWord;

  const dispatch = useDispatch();
  const hardWordsList = useSelector(hardWords);
  const showTranslate = useSelector(translate);
  const showControls = useSelector(controls);

  const classes = useStyles();

  const [isAudio, setIsAudio] = useState(false);
  const [isAudioMeaning, setIsAudioMeaning] = useState(false);
  const [isAudioExample, setIsAudioExample] = useState(false);

  const soundPrefix = urls.base;
  const [playAudioExample, { isPlaying: isAudioExamplePlaying, stop: stopAudioExample }] = useSound(`${soundPrefix}/${audioExample}`, {onend: ()=> setCanPlay(true)});
  const [playAudioMeaning, { isPlaying: isAudioMeaningPlaying, stop: stopAudioMeaning }] = useSound(`${soundPrefix}/${audioMeaning}`, {onend: ()=> setIsAudioExample(true)});
  const [playAudio, { isPlaying: isAudioPlaying, stop: stopAudio }] = useSound(`${soundPrefix}/${audio}`, {onend: ()=> setIsAudioMeaning(true)});

  useEffect(() => {
    if (isAudio) {
      playAudio();
      setIsAudio(false);
    }
    return () => {
      if (isAudioPlaying) stopAudio();
    }
  }, [isAudio, isAudioPlaying, playAudio, stopAudio]);

  useEffect(() => {
    if (isAudioMeaning) {
      playAudioMeaning();
      setIsAudioMeaning(false);
    }
    return () => {
      if (isAudioMeaningPlaying) stopAudioMeaning();
    }
  }, [isAudioMeaning, isAudioMeaningPlaying, playAudioMeaning, stopAudioMeaning]);

  useEffect(() => {
    if (isAudioExample) {
      playAudioExample();
      setIsAudioExample(false);
    }
    return () => {
      if (isAudioExamplePlaying) stopAudioExample();
    }
  }, [isAudioExample, isAudioExamplePlaying, playAudioExample, stopAudioExample]);

  const handleAudio = () => {
    if (canPlay) {
      setIsAudio(true);
      setCanPlay(false);
    }
  };

  const createMarkup = (text) => {
    return {__html: text};
  }

  const isHard = () => {
    const hardWordsArray = hardWordsList[groupNum][pageNum] || [];
    return hardWordsArray.includes(id);
  };

  const handleHard = () => dispatch(setHardWords({groupNum, pageNum, id}));
  const handleDeleted = () => dispatch(setDeletedWords({groupNum, pageNum, id}));

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
            {showTranslate && <span>{wordTranslate}</span>}
            <Tooltip title="Озвучить">
              <IconButton display="inline" onClick={handleAudio}>
                <VolumeDownIcon />
              </IconButton>
            </Tooltip>
          </Typography>

          <Typography dangerouslySetInnerHTML={createMarkup(textMeaning)} className={classes.text}></Typography>
          {showTranslate && <Typography className={`${classes.bottomLine} ${classes.text}`}>{textMeaningTranslate}</Typography>}

          <Typography dangerouslySetInnerHTML={createMarkup(textExample)} className={classes.text}></Typography>
          {showTranslate && <Typography className={classes.text}>{textExampleTranslate}</Typography>}
        </CardContent>

        <div className={classes.actionsWrapper}>
          {showControls &&
           <CardActions disableSpacing>
            <Tooltip title="В сложные">
              <IconButton onClick={handleHard}>
              <img src="https://img.icons8.com/material/24/000000/learning.png" alt='В сложные'/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Удалить">
              <IconButton onClick={handleDeleted}>
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
