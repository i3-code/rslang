import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import Word from './Word';

export default function Page({words}) {
  const [canPlay, setCanPlay] = useState(true);

  return (
    <Grid>
      { words && words.map((word) =>
        <Word
          currentWord={word}
          canPlay={canPlay}
          setCanPlay={setCanPlay}
          key={word.id}
        />) }
    </Grid>
  );
}
