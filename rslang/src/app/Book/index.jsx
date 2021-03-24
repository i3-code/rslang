import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import Menu from '../../components/Menu';
import Page from './Page';

export default function Book({del, deletedWords, addToHardWords, hardWords}) {
  return (
    <Grid>
      <Container>
        <Page group={0} page={0} del={del} deletedWords={deletedWords} hardWords={hardWords} addToHardWords={addToHardWords}/>
      </Container>
    </Grid>
  );
}
