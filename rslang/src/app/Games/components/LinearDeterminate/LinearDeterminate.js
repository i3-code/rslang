import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import {useSelector} from "react-redux";
import {selectProgress} from "../../Savannah/savannahSlice";

const useStyles = makeStyles({
  root: {
    width: '50%',
    position: 'absolute',
    top: '110px'
  },
});

export default function LinearDeterminate() {
  const classes = useStyles();
  const progress = useSelector(selectProgress);

  return (
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
}
