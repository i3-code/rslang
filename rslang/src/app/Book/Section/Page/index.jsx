import React from 'react';
import { Grid } from '@material-ui/core';

import Word from './Word';

export default function Page({words, groupNum, pageNum}) {
  return (
    <Grid>
      { words && words.map((word) => <Word currentWord={word} groupNum={groupNum} pageNum={pageNum} key={word.id}/>) }
    </Grid>
  );
}
