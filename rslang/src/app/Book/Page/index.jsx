import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';

import Word from './Word';

export default function Page({group, page, deletedWords, del}) {
  const [words, setWords] = useState(null);

  useEffect(() => {
    axios
      .get(`https://react-rslang.herokuapp.com/words?group=${group}&page=${page}`)
      .then((response) => setWords(response.data))
  },[group, page])

  return (
    <Grid>
      { words && words.filter((word)=> !deletedWords.includes(word.id))
        .map((word) => {
        return <Word currentWord={word} key={word.id} delWord={del}/>
      })}
    </Grid>
  );
}
