import React from 'react';
import useStyles from './style';
import useSound from 'use-sound';

import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Tooltip } from '@material-ui/core';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Word({currentWord, delWord, page, addToHardWords, hardWords, translation, actions}) {
  const {id, audio, audioMeaning, audioExample, image, word, transcription, wordTranslate, textMeaning, textMeaningTranslate,
    textExample, textExampleTranslate} = currentWord;
  const classes = useStyles();
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
    if (hardWords[page] && hardWords[page].includes(id)) {
      return true
    }
    return false
  }

  return (
    <Card className={`${classes.root} ${ isHard() ? classes.hard : ''}`}>
      <CardMedia
        className={classes.media}
        image={`https://raw.githubusercontent.com/i3-code/react-rslang-be/main/${image}`}
      />
      <div className={classes.contentWrapper}>
        <CardContent>
          <Typography>
            <span className={classes.word}>{word}</span>
            <span>{` ${transcription} `}</span>
            {translation && <span>{wordTranslate}</span>}
            <Tooltip title="Звук">
            <IconButton
              display="inline"
              onClick={playActive}
            >
              <VolumeDownIcon />
            </IconButton>
              </Tooltip>
          </Typography>

          <Typography dangerouslySetInnerHTML={createMarkup(textMeaning)}></Typography>
          {translation && <Typography className={classes.bottomLine}>{textMeaningTranslate}</Typography>}

          <Typography dangerouslySetInnerHTML={createMarkup(textExample)}></Typography>
          {translation && <Typography>{textExampleTranslate}</Typography>}
        </CardContent>
        <div className={classes.actionsWrapper}>
          {actions &&
           <CardActions disableSpacing>
            <Tooltip title="В сложные">
              <IconButton aria-label="hard" onClick={()=>addToHardWords([page, id])}>
              <img src="https://img.icons8.com/material/24/000000/learning.png" alt='В сложные'/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Удалить">
              <IconButton aria-label="delete" onClick={()=>delWord([page, id])}>
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
