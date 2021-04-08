import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaginationItem from '@material-ui/lab/PaginationItem';
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';

import useStyles from './style';

import Word from './Word';

import urls from '../../../constants/urls';
import { WORDS_ON_PAGE } from '../../../constants';

const cache = {};

export const fetchWord = async (id) => {
  const request = `${urls.words.all}/${id}`;
  return new Promise((resolve, reject) => {
    if (cache[request]) resolve(cache[request]);
    axios
      .get(request)
      .then((response) => {
        cache[request] = response.data;
        resolve(cache[request]);
      })
      .catch((error) => {
        console.log(error);
        resolve(null);
      });
  });
};

const pageGroups = {
  0: 'blue',
  1: 'turquoise',
  2: 'orange',
  3: 'pink',
  4: 'violet',
  5: 'yellow',
};

const generatePages = (words) => {
  const db = {};
  let currPage = 1;
  Object.entries(words).forEach(([group, pages]) => {
    const groupWords = [].concat(...pages);
    groupWords.forEach((word, index) => {
      if (!db[currPage]) db[currPage] = {};
      if (!db[currPage].group) db[currPage].group = group;
      if (!db[currPage].words) db[currPage].words = [];
      if (word) db[currPage].words.push(word);
      if (db[currPage].words.length >= WORDS_ON_PAGE || index === groupWords.length - 1) currPage += 1;
    });
  });
  return db;
}

export default function Page({words}) {
  const [pageNum, setPageNum] = useState(1);
  const [pages] = useState(generatePages(words));
  const [totalPages] = useState(Object.keys(pages).length);
  const [page, setPage] = useState(pages[pageNum]);
  const [pageWords, setPageWords] = useState([]);
  const classes = useStyles();

  const handleChange = (event, value) => {
    if (pageNum === value) return;
    setPageNum(value);
    setPage(pages[value]);
  };

  const getPaginationItem = (item) => {
    let pageNum = item.page;
    if (pageNum < 1) pageNum = 1;
    if (pageNum > totalPages) pageNum = totalPages;
    const pageColor = pageGroups[pages[pageNum].group];
    return <PaginationItem
      {...item}
      className={classes[pageColor]}
    />
  };

  useEffect(() => {
    const retArr = [];
    if (totalPages) {
      page.words.map(async (word) => {
        const currentWord = await fetchWord(word);
        retArr.push(currentWord);
        if (retArr.length === page.words.length) setPageWords(retArr);
      });
    }
  },[page, totalPages]);

  if (!totalPages) return <Grid>Слов не найдено</Grid>;

  return (
    <Grid>
      {pageWords.map((currentWord) => {
        return <Word currentWord={currentWord} key={currentWord.id} />;
      })}
      <Pagination
         count={totalPages}
         variant="outlined"
         color="primary"
         size="large"
         page={pageNum}
         onChange={handleChange}
         showFirstButton
         showLastButton
         renderItem={getPaginationItem}
      />
    </Grid>
  )
}
