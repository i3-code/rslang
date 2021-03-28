import React from 'react';
import { Container, Grid, Box, Link } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import Page from './Page';
import useStyles from './style';

import { useDispatch } from 'react-redux';
import { setPage } from '../bookSlice';

const storageInfo = localStorage.getItem('rslang20') ? JSON.parse(localStorage.getItem('rslang20'))
: {page: 0, group: 0}

export default function Section() {
  const classes = useStyles();
  const dispatch = useDispatch();
  console.log(storageInfo)

  return (
    <Grid>
      <Container className={classes.bookWrapper}>
        <Page />
        <Pagination
         count={30}
         variant="outlined"
         color="primary"
         size="large"
         defaultPage={storageInfo.page + 1}
         onChange={(e)=> {
          storageInfo.page = +e.target.innerText - 1
          localStorage.setItem('rslang20', JSON.stringify(storageInfo))
           dispatch(setPage({numberPage: +e.target.innerText - 1}))}
         }
         className={classes.pagination}
        />
        <Box className={classes.linkwrapper}>
          <Link href="#/games/savannah" underline='none' className={classes.link}> Саванна </Link>
          <Link href="#/games/audiocall" underline='none' className={classes.link}> Аудиовызов </Link>
          <Link href="#/games/sprint" underline='none' className={classes.link}> Спринт </Link>
          <Link href="#/games/ourgame" underline='none' className={classes.link}> Своя игра </Link>
        </Box>
      </Container>
    </Grid>
  );
}
