import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';

import Word from './Word';
import { useSelector } from 'react-redux';
import { deletedWords } from '../../../../appSlice';
import { page, group } from '../../bookSlice';

export default function Page() {
  const [words, setWords] = useState(null);

  const deletedWordsList = useSelector(deletedWords);
  const pageNum = useSelector(page);
  const groupNum = useSelector(group);

  const filterFunk = (id) => {
    return !deletedWordsList[pageNum] ? true : (!deletedWordsList[pageNum].includes(id))
  }

  useEffect(() => {
    axios
      .get(`https://react-rslang.herokuapp.com/words?group=${groupNum}&page=${pageNum}`)
      .then((response) => setWords(response.data))
  },[groupNum, pageNum])

  return (
    <Grid>
      { words && words.filter((word)=> filterFunk(word.id))
        .map((word) => <Word currentWord={word} key={word.id}/>)
      }
    </Grid>
  );
}
