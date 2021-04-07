import React, { useState, useEffect, useCallback } from 'react';
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
import { deletedWords } from '../../../redux/appSlice';

const cache = {};
const totalPages = 30;
const totalWords = 600;

const fetchPage = async (request) => {
  if (cache[request]) return cache[request];
  return new Promise((resolve, reject) => {
    axios
    .get(request)
    .then((response) => {
      cache[request] = response.data;
      resolve(cache[request]);
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
  });
}

export default function Section(props) {
  const groupNum = Number(props?.match?.params?.group) || 0;
  const [pageNum, setPageNum] = useState(useSelector(page)[groupNum] || 1);
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState(null);
  const deletedWordsList = useSelector(deletedWords);

  const dispatch = useDispatch();

  const classes = useStyles();

  const filterFunc = useCallback((id) => {
    const deletedArray = deletedWordsList[groupNum][pageNum] || [];
    return !deletedArray.includes(id);
  }, [deletedWordsList, groupNum, pageNum]);

  const isDisabled = (page) => {
    const deletedArray = deletedWordsList[groupNum][page] || [];
    return deletedArray.length === totalWords / totalPages;
  }

  const handleChange = (event, value) => {
    if (pageNum === value) return;
    setLoading(true);
    setPageNum(value);
    dispatch(setPage({pageNum: value, groupNum}));
  };

  useEffect(() => {
    const getWords = async () => {
    const request = `${urls.words.all}?group=${groupNum}&page=${pageNum - 1}`;
    const reqWords = await fetchPage(request);
    const words = reqWords.filter((word) => filterFunc(word.id));
    setWords(words);
    setLoading(false);
    };
    getWords();
  },[filterFunc, groupNum, pageNum]);

  const getPaginationItem = (item) => {
    return <PaginationItem
      {...item}
      disabled={isDisabled(item.page)}
    />
  }

  return (
    <Grid>
      <Container className={classes.bookWrapper}>
        { (loading) ? <Loading /> : <Page {...{words, groupNum, pageNum}} /> }
        <Pagination
         count={totalPages}
         variant="outlined"
         color="primary"
         size="large"
         page={pageNum}
         onChange={handleChange}
         showFirstButton
         showLastButton
         className={classes.pagination}
         renderItem={getPaginationItem}
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
