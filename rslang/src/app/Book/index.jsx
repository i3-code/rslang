import React, { useState } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import Menu from '../../components/Menu';
import Page from './Page';

export default function Book({del, deletedWords}) {
  // const [deletedWords, setDeletedWords] = useState([])
  // const [hardWords, setHardWords] = useState([])

  // const deleteWord = (wordId) => {
  //   setDeletedWords([...deletedWords, wordId])
  // }

  return (
    <Grid>
      <Container>
        <Typography variant="h2">Book</Typography>
        <Page group={0} page={0} del={del} deletedWords={deletedWords}/>
        <Menu />
      </Container>
    </Grid>
  );
}
