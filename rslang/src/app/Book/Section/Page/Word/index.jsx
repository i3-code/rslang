import React, { useEffect, useState } from 'react';
import useStyles from './style';
import useSound from 'use-sound';
import { useSelector, useDispatch } from 'react-redux';
import {setHardWords, setDeletedWords, setInactivePagination, hardWords } from '../../../../../redux/appSlice';
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

export default function Word({currentWord, groupNum, pageNum, wordsOnPage}) {
  const {id, audio, audioMeaning, audioExample, image, word, transcription, wordTranslate, textMeaning, textMeaningTranslate,
    textExample, textExampleTranslate} = currentWord;

  const dispatch = useDispatch();
  const hardWordsList = useSelector(hardWords);
  const showTranslate = useSelector(translate);
  const showControls = useSelector(controls);

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

  const handleAudio = () => setIsAudio(true);

  const createMarkup = (text) => {
    return {__html: text};
  }

  const checkNumberOfWordsOnPage = () => {
    if (wordsOnPage === 1) {
      dispatch(setInactivePagination({groupNum, pageNum}))
    }

  }

  const isHard = () => hardWordsList[groupNum].includes(id);
  const handleHard = () => dispatch(setHardWords({groupNum, id}));
  const handleDeleted = () => { dispatch(setDeletedWords({groupNum, id})); checkNumberOfWordsOnPage() };


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
