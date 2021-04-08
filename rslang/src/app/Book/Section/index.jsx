import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Grid, Box, Link } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

import Loading from '../../../components/partials/Loading';

import Page from './Page';
import useStyles from './style';

import { page, setPage } from '../bookSlice';
import { deletedWords } from '../../../redux/appSlice';

import fetchPage from '../../../functions/fetchPage';

import { WORDS_ON_PAGE, PAGES_IN_GROUP} from '../../../constants';

const totalPages = PAGES_IN_GROUP / WORDS_ON_PAGE;

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
    return deletedArray.length === WORDS_ON_PAGE;
  }

  const handleChange = (event, value) => {
    if (pageNum === value) return;
    setLoading(true);
    setPageNum(value);
    dispatch(setPage({pageNum: value, groupNum}));
  };

  useEffect(() => {
    const getWords = async () => {
      const reqWords = await fetchPage(groupNum, pageNum);
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

  const postfix = `${groupNum}/${pageNum}`;
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
         siblingCount={5}
        />
        <PaginationItem />
        <Box className={classes.linkwrapper}>
          <Link href={`#/games/savannah/${postfix}`} className={classes.link}> Саванна </Link>
          <Link href={`#/games/audiocall/${postfix}`} className={classes.link}> Аудиовызов </Link>
          <Link href={`#/games/sprint/${postfix}`} className={classes.link}> Спринт </Link>
          <Link href={`#/games/sort/${postfix}`} className={classes.link}> Сортировка </Link>
        </Box>
      </Container>
    </Grid>
  );
}
