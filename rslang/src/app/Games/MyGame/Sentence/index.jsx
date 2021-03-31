import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Word from '../Word';

import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

import useStyles from './styles';

const Sentence = ({ sentenceSplit, onCheck, onClickNext, sentenceRef, currentSentences, answer, check }) => {
  const [words, setWords] = useState(sentenceSplit);
  const classes = useStyles();

  useEffect(() => {
    setWords(sentenceSplit);
  }, [currentSentences]);

  function handleOnDragEnd(e) {
    if (!e.destination) return;
    const newSentence = Array.from(words);
    const [reorderedSentence] = newSentence.splice(e.source.index, 1);
    newSentence.splice(e.destination.index, 0, reorderedSentence);
    setWords(newSentence);
  }

  return (
    <Grid width="100%">
      <Grid ref={sentenceRef}>
        <Grid className={classes.answer}>{check && <Grid>{answer ? 'Верно!' : 'Не верно!'}</Grid>}</Grid>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="playingField" direction="horizontal ">
            {(provided) => (
              <Grid container direction="row" justify="center" {...provided.droppableProps} ref={provided.innerRef}>
                {words.map((el, i) => {
                  let id = `el+${i}`;
                  return (
                    <Draggable key={id} draggableId={id} index={i}>
                      {(provided) => <Word word={el} provided={provided} />}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
      <Grid container direction="row" justify="center">
        <Button className={classes.button} onClick={() => onCheck(words)}>
          Проверить
        </Button>
        <Button className={classes.button} onClick={onClickNext}>
          Дальше
        </Button>
      </Grid>
    </Grid>
  );
};

export default Sentence;
