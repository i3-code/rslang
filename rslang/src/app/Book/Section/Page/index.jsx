import React from 'react';
import { Grid } from '@material-ui/core';

import Word from './Word';

import { useSelector } from 'react-redux';
import { deletedWords } from '../../../../redux/appSlice';

export default function Page({words, groupNum, pageNum}) {
  const deletedWordsList = useSelector(deletedWords);

  const filterFunc = (id) => {
    return !deletedWordsList[groupNum].includes(id);
  }

  return (
    <Grid>
      { words && words.filter((word) => filterFunc(word.id))
        .map((word) => <Word currentWord={word} groupNum={groupNum} key={word.id}/>)
      }
    </Grid>
  );
}
