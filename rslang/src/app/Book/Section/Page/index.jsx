import React from 'react';
import { Grid } from '@material-ui/core';

import Word from './Word';

import { useSelector } from 'react-redux';
import { deletedWords } from '../../../../redux/appSlice';

export default function Page({words, groupNum, pageNum}) {
  console.log(pageNum);
  const deletedWordsList = useSelector(deletedWords);

  const filterFunc = (id) => {
    const deletedArray = deletedWordsList[groupNum][pageNum] || [];
    return !deletedArray.includes(id);
  }

  return (
    <Grid>
      { words && words.filter((word) => filterFunc(word.id))
        .map((word) => <Word currentWord={word} groupNum={groupNum} pageNum={pageNum} key={word.id}/>)
      }
    </Grid>
  );
}
