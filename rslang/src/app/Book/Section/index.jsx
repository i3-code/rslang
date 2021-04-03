import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Container, Grid, Box, Link } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

import Loading from '../../../components/partials/Loading';

import Page from './Page';
import useStyles from './style';

import urls from '../../../constants/urls';

import { page, setPage } from '../bookSlice';
import { inactivePagination } from '../../../redux/appSlice';

export default function Section(props) {
  const groupNum = Number(props?.match?.params?.group) || 0;
  const [pageNum, setPageNum] = useState(useSelector(page)[groupNum] || 1);
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState(null);
  const dispatch = useDispatch();
  const inactivePages =useSelector(inactivePagination)

  const classes = useStyles();

  const handleChange = (event, value) => {
    if (pageNum === value) return;
    setLoading(true);
    setPageNum(value);
    dispatch(setPage({pageNum: value, groupNum}));
  };

  useEffect(() => {
    const fetchData = async () => {
      axios
      .get(`${urls.words.all}?group=${groupNum}&page=${pageNum - 1}`)
      .then((response) => {
        setWords(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
    };

    fetchData();
  },[groupNum, pageNum])


  useEffect(() => {
    const pagesBtn = document.querySelectorAll('button');
    console.log(pagesBtn)
    let pagesBtnFiltered = [];
    for (let i = 0; i < pagesBtn.length; i++) {
      if (inactivePages[groupNum] && inactivePages[groupNum].includes(+pagesBtn[i].innerText)) {
        pagesBtnFiltered.push(pagesBtn[i])
      }
    }
    pagesBtnFiltered.forEach(btn => { btn.classList.add(`${classes.notActive}`); btn.disabled = true})
  },[groupNum, pageNum, inactivePages, classes.notActive])

  return (
    <Grid>
      <Container className={classes.bookWrapper}>
        { (loading) ? <Loading /> : <Page {...{words, groupNum, pageNum}} /> }
        <Pagination
         count={30}
         variant="outlined"
         color="primary"
         size="large"
         page={pageNum}
         onChange={handleChange}
         showFirstButton
         showLastButton
         className={classes.pagination}
        />
        <PaginationItem />
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
