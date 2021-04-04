import React, { useState } from 'react';
import PaginationItem from '@material-ui/lab/PaginationItem';
import Pagination from '@material-ui/lab/Pagination';


import useStyles from './style';

const pageGroups = {
  1: 'blue',
  2: 'turquoise',
  3: 'orange',
  4: 'pink',
  5: 'violet',
  6: 'yellow',
};


export default function Page({words}) {
  const [pageNum, setPageNum] = useState(1);
  const classes = useStyles();

  const handleChange = (event, value) => {
    if (pageNum === value) return;
    setPageNum(value);
  };


  const getPaginationItem = (item) => {
    const pageColor = pageGroups[item.page];
    return <PaginationItem
      {...item}
      className={classes[pageColor]}
    />
  }

  return (
    <div>
      <Pagination
         count={6}
         variant="outlined"
         color="primary"
         size="large"
         page={pageNum}
         onChange={handleChange}
         showFirstButton
         showLastButton
         renderItem={getPaginationItem}
      />
    </div>
  )
}
