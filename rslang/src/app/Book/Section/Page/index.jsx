import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import Word from './Word';

export default function Page({words, groupNum, pageNum}) {
  const [canPlay, setCanPlay] = useState(true);

  return (
    <Grid>
      { words && words.map((word) =>
        <Word
          currentWord={word}
          groupNum={groupNum}
          pageNum={pageNum}
          canPlay={canPlay}
          setCanPlay={setCanPlay}
          key={word.id}
        />) }
    </Grid>
  );
}
