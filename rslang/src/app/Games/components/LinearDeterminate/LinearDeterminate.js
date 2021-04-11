import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    width: '50%',
    top: '30px',
    right: '0',
    left: '0',
    margin: 'auto',
  },
});

export default function LinearDeterminate({ progress }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
}
