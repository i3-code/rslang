import React, { useEffect, useState } from 'react';

import useStyles from './style';

export default function Word({currentWord}) {
  const {id, audio, audioMeaning, audioExample, image, word, transcription, wordTranslate, textMeaning, textMeaningTranslate,
    textExample, textExampleTranslate} = currentWord;
  return (
    <div>{word}</div>
  );
}
