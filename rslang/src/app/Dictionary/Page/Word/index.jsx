import React, { useEffect, useState } from 'react';
import useStyles from './style';
import useSound from 'use-sound';
import { useSelector, useDispatch } from 'react-redux';
import { setRestoredWords, setUnlearnedWords, hardWords, deletedWords } from '../../../../redux/appSlice';
import { getWords } from '../../../../redux/wordsSlice';
import { translate, controls } from '../../../Book/bookSlice';

import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Tooltip } from '@material-ui/core';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import ClearAllIcon from '@material-ui/icons/ClearAll';

import urls from '../../../../constants/urls';
import { DEFAULT_WORD_STAT, WORD_STATS } from '../../../../constants';

const borderColor = {
  0: 'blue',
  1: 'turquoise',
  2: 'orange',
  3: 'pink',
  4: 'violet',
  5: 'yellow',
};

export default function Word({currentWord, removeWord, canPlay, setCanPlay}) {
  const {id, audio, audioMeaning, audioExample, image, word, transcription, wordTranslate, textMeaning, textMeaningTranslate,
    textExample, textExampleTranslate, group: groupNum, page: pageNum} = currentWord;

  const dispatch = useDispatch();
  const hardWordsList = useSelector(hardWords);
  const deletedWordsList = useSelector(deletedWords);
  const showTranslate = useSelector(translate);
  const showControls = useSelector(controls);
  const words = useSelector(getWords);
  const wordStats = words[id] || { ...DEFAULT_WORD_STAT };

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

  const isDeleted = () => {
    const deletedWordsArray = deletedWordsList[groupNum][pageNum] || [];
    return deletedWordsArray.includes(id);
  };

  const handleUnlearned = () => {
    dispatch(setUnlearnedWords({groupNum, pageNum, id}));
    removeWord(id);
  };

  const handleRestore = () => {
    dispatch(setRestoredWords({groupNum, pageNum, id}));
    removeWord(id);
  };


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
             {isHard() &&
              <Tooltip title="Убрать из сложных">
                <IconButton onClick={handleUnlearned}>
                  <ClearAllIcon />
                </IconButton>
              </Tooltip>
             }
            {isDeleted() &&
              <Tooltip title="Восстановить">
                <IconButton onClick={handleRestore}>
                  <RestoreFromTrashIcon />
                </IconButton>
            </Tooltip>
            }
          </CardActions>}
          <Typography>Верно: {wordStats[WORD_STATS.CORRECT]}</Typography>
          <Typography>Неверно: {wordStats[WORD_STATS.WRONG]}</Typography>
          </div>
      </div>
    </Card>
  )
}
