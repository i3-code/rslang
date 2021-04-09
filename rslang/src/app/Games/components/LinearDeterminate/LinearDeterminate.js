import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    width: '50%',
    position: 'absolute',
    top: '110px',
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
