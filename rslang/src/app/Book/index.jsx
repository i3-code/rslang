import React, { useState } from 'react';
import { Container, Grid, Typography, Box, Button } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import Page from './Page';
import useStyles from './style';

export default function Book({del, deletedWords, addToHardWords, hardWords}) {
  const classes = useStyles();

  const [translation, setTranslation] = useState(true);
  const [actions, setActions] = useState(true)
  const [page, setPage] = useState(0)

  return (
    <Grid>
      <Container className={classes.bookWrapper}>
       <Box className={classes.btnWrapper}>
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={()=> setTranslation(!translation)}
          >
            Перевод
          </Button>
          <Button variant="contained" color="secondary" onClick={()=> setActions(!actions)}>Действия</Button>
        </Box>
        <Page
         group={0}
         page={page}
         del={del}
         deletedWords={deletedWords}
         hardWords={hardWords}
         addToHardWords={addToHardWords}
         translation={translation}
         actions={actions}
        />
        <Pagination
         count={30}
         variant="outlined"
         color="primary"
         size="large"
         onChange={(e)=> setPage(+e.target.innerText - 1)}
         className={classes.pagination}
        />
      </Container>
    </Grid>
  );
}
