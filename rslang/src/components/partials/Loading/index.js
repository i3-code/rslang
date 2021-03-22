import React from 'react';
import classNames from 'classnames';
import { CircularProgress, Grid } from '@material-ui/core';

import styles from './styles';

const Loading = ({ fullScreen = false, className }) => {
  const classes = styles();
  return (
    <Grid className={classNames(classes.root, {[classes.fixed]: fullScreen}, className)}>
      <CircularProgress className={classes.loader} />
    </Grid>
  );
};

export default Loading;
