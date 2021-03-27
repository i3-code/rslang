import React from 'react';
import { Container, Grid, Box, Link } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import Page from './Page';
import useStyles from './style';

import { useDispatch } from 'react-redux';
import { setPage } from '../bookSlice';


export default function Section() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Grid>
      <Container className={classes.bookWrapper}>
        <Page />
        <Pagination
         count={30}
         variant="outlined"
         color="primary"
         size="large"
         onChange={(e)=> dispatch(setPage({numberPage: +e.target.innerText - 1}))}
         className={classes.pagination}
        />
        <Box className={classes.linkwrapper}>
          <Link href="#" underline='none' className={classes.link}> Саванна </Link>
          <Link href="#" underline='none' className={classes.link}> Аудиовызов </Link>
          <Link href="#" underline='none' className={classes.link}> Спринт </Link>
          <Link href="#" underline='none' className={classes.link}> Своя игра </Link>
        </Box>
      </Container>
    </Grid>
  );
}
