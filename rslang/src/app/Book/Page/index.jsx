import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';

import Word from './Word';

export default function Page({group, page, deletedWords, del, addToHardWords, hardWords, translation, actions}) {
  const [words, setWords] = useState(null);

  const filterFunk = (id) => {
    if (!deletedWords[page]) {
      return true
    } else {
      return !deletedWords[page].includes(id)
    }
  }

  useEffect(() => {
    axios
      .get(`https://react-rslang.herokuapp.com/words?group=${group}&page=${page}`)
      .then((response) => setWords(response.data))
  },[group, page])

  return (
    <Grid>
      { words && words.filter((word)=> filterFunk(word.id))
        .map((word) => {
        return <Word
          currentWord={word}
          key={word.id}
          delWord={del}
          page={page}
          addToHardWords={addToHardWords}
          hardWords={hardWords}
          translation={translation}
          actions={actions}
        />
      })}
    </Grid>
  );
}
