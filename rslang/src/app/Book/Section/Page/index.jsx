import React from 'react';
import { Grid } from '@material-ui/core';

import Word from './Word';

import { useSelector } from 'react-redux';
import { deletedWords } from '../../../../appSlice';

export default function Page({words, pageNum}) {
  const deletedWordsList = useSelector(deletedWords);

  const filterFunk = (id) => {
    return !deletedWordsList[pageNum] ? true : (!deletedWordsList[pageNum].includes(id))
  }

  return (
    <Grid>
      { words && words.filter((word)=> filterFunk(word.id))
        .map((word) => <Word currentWord={word} key={word.id}/>)
      }
    </Grid>
  );
}
