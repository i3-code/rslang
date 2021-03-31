import React from "react";

import useStyles from './styles';
import { Grid} from '@material-ui/core';

const Word = ({ word, provided }) => {
    const classes = useStyles();
  return (
    <Grid className={classes.cell}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {word}
    </Grid>
  );
};

export default Word;