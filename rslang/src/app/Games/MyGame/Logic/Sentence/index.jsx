import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Word from './Word';
import {
  selectCount,
  setCheckTrue,
  nextSentence,
  selectLearningWord,
  setCheckFalse,
  selectShuffleSentence,
  checkAnswer,
} from '../../myGameSlice';

import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

import useStyles from './styles';

const Sentence = ({ sentenceRef}) => {
  const sentenceSplit= useSelector(selectShuffleSentence)
  const [words, setWords] = useState(sentenceSplit);
  const classes = useStyles();
  const dispatch = useDispatch();
  const count = useSelector(selectCount);
  const learningWord=useSelector(selectLearningWord);

  useEffect(() => {
    setWords(sentenceSplit);
  }, [sentenceSplit]);

  function handleOnDragEnd(e) {
    if (!e.destination) return;
    const newSentence = Array.from(words);
    const [reorderedSentence] = newSentence.splice(e.source.index, 1);
    newSentence.splice(e.destination.index, 0, reorderedSentence);
    setWords(newSentence);
  }

  const onCheck = () => {
    dispatch(setCheckTrue());
    dispatch(checkAnswer({ answer: words.join(' '), count: count }));
    setTimeout(() => {
      dispatch(setCheckFalse())
    }, 1000);
  };

  return (
    <Grid className={classes.root}>
      <Grid ref={sentenceRef}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="playingField" direction="horizontal ">
            {(provided) => (
              <Grid container direction="row" justify="center" {...provided.droppableProps} ref={provided.innerRef}>
                {words.map((el, i) => {
                  let id = `el+${i}`;
                  return (
                    <Draggable key={id} draggableId={id} index={i}>
                      {(provided) => (
                        <Word
                          word={el}
                          provided={provided}
                          setColor={(el.indexOf(learningWord)>-1)}
                        />
                      )}
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
        <Button className={classes.buttonRight} onClick={onCheck}>
          Проверить
        </Button>
        <Button className={classes.buttonNext} onClick={() => dispatch(nextSentence({ count: count }))}>
          Дальше
        </Button>
      </Grid>
    </Grid>
  );
};

export default Sentence;
