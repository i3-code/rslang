import React from 'react';

export default function Word({currentWord}) {
  const {word} = currentWord;
  return (
    <div>{word}</div>
  );
}
