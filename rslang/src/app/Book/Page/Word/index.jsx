import React from 'react';
import useStyles from './style';
import useSound from 'use-sound';

import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Tooltip } from '@material-ui/core';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Word({currentWord, delWord}) {
  const {id, audio, audioMeaning, audioExample, image, word, transcription, wordTranslate, textMeaning, textMeaningTranslate,
    textExample, textExampleTranslate} = currentWord;
  const classes = useStyles();
  const createMarkup = (text) => {
    return {__html: text};
  }

  const addToHard = () => {
    console.log('difficult')
  }


  const [playMeaning] = useSound(
    `https://raw.githubusercontent.com/i3-code/react-rslang-be/main/${audioMeaning}`, {
      onend: () => {
        console.log('rrr')
        playExample()
      },
    }
  )

  const [playActive] = useSound(
    `https://raw.githubusercontent.com/i3-code/react-rslang-be/main/${audio}`, {
      onend: () => {
        console.log(playMeaning)
        playMeaning()
      }
    },
  )

  const [playExample] = useSound(
    `https://raw.githubusercontent.com/i3-code/react-rslang-be/main/${audioExample}`,
  )

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={`https://raw.githubusercontent.com/i3-code/react-rslang-be/main/${image}`}
      />
      <CardContent>
        <Typography>
          <span>{`${word} `}</span>
          <span>{transcription}</span>
          <IconButton
            display="inline"
            onClick={playActive}
          >
            <VolumeDownIcon />
          </IconButton>
        </Typography>
        <Typography>{wordTranslate}</Typography>

        <Typography dangerouslySetInnerHTML={createMarkup(textMeaning)}></Typography>
        <Typography>{textMeaningTranslate}</Typography>

        <Typography dangerouslySetInnerHTML={createMarkup(textExample)}></Typography>
        <Typography>{textExampleTranslate}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Add do difficult">
          <IconButton aria-label="hard" onClick={addToHard}>
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={()=>delWord(id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  )
}
