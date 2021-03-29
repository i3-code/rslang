import React, { useEffect, useState } from 'react';
import { Button, FormControl, Grid, MenuItem, Select, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/userSlice';
import { WordsService } from '../../services/words.service';
import useStyles from './styles';

export const Examples = () => {
  const classes = useStyles();
  const user = useSelector(getUser);
  const [words, setWords] = useState([]);
  const [userWords, setUserWords] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');

  const getUserWords = async () => {
    try {
      const response = await WordsService.getUserWords();
      setUserWords(response.data[0].paginatedResults);
    } catch (err) {
      console.log(err);
    }
  };

  const getWords = async () => {
    try {
      const response = await WordsService.getAll();
      setWords(response.data[0].paginatedResults);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      getUserWords();
      getWords();
    }
  }, [user]);

  const handleAddWord = async (wordId) => {
    const word = {
      difficulty,
      optional: {
        fail: 0,
        success: 0,
      },
    };
    await WordsService.addUserWord(wordId, word);
    getUserWords();
    getWords();
  };

  return (
    <Grid>
      <Grid className={classes.categoryContainer}>
        <Typography>All words with userInfo</Typography>
        <Grid className={classes.wordsContainer}>
          {words.map((word) => (
            <Grid container alignItems="center" className={classes.wordLine}>
              <Typography key={word._id}>{word.word}</Typography>
              {word.userWord ? (
                <Grid container className={classes.wordStat}>
                  <Typography>Difficulty: {word.userWord.difficulty}</Typography>
                  <Typography>Fail: {word.userWord.optional.fail || 0}</Typography>
                  <Typography>Success: {word.userWord.optional.success || 0}</Typography>
                </Grid>
              ) : (
                <Grid>
                  <Button
                    onClick={() => handleAddWord(word._id)}
                    className={classes.add}
                    color="primary"
                    variant="contained"
                  >
                    Add word
                  </Button>
                  <FormControl>
                    <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                      <MenuItem value="easy">easy</MenuItem>
                      <MenuItem value="hard">hard</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid>
        <Typography>Only user's words with userInfo</Typography>
        <Grid className={classes.wordsContainer}>
          {userWords.map((word) => (
            <Grid container className={classes.wordLine}>
              <Typography key={word.id}>{word.word}</Typography>
              <Grid container className={classes.wordStat}>
                <Typography>Difficulty: {word.userWord.difficulty}</Typography>
                <Typography>Fail: {word.userWord.optional.fail || 0}</Typography>
                <Typography>Success: {word.userWord.optional.success || 0}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
