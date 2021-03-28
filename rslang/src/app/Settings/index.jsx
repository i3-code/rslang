import React from 'react';
import { Box, Button } from '@material-ui/core';

import useStyles from './style';

import { useDispatch } from 'react-redux';
import { setTranslation, setDisplayActions } from '../Book/bookSlice';


export default function Settings() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
  <Box>
    <Button
      variant="contained"
      color="primary"
      className={classes.btn}
      onClick={()=> dispatch(setTranslation())}
    >
      Отображать перевод
    </Button>
    <Button variant="contained" color="secondary" onClick={()=> dispatch(setDisplayActions())}>Отображать действия</Button>
  </Box>
  );
}
