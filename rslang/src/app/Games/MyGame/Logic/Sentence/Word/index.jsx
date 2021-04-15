import React from "react";

import useStyles from './styles';
import { Grid} from '@material-ui/core';

const Word = ({ word, provided, setColor }) => {
    const classes = useStyles();
  return (
    <Grid className={setColor?classes.word:classes.cell}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {word}
    </Grid>
  );
};

export default Word;
