import React, { useEffect, useState } from 'react';
import { Button, FormControl, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/userSlice';
import { WordsService, WORD_STATS } from '../../services/words.service';
import useStyles from './styles';
import { UserService } from '../../services/user.service';

export const Examples = () => {
  const classes = useStyles();
  const user = useSelector(getUser);
  const [words, setWords] = useState([]);
  const [userWords, setUserWords] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [winStreak, setWinStreak] = useState(0);
  const [newWinStreak, setNewWinStreak] = useState(0);

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

  const getWinStreak = async () => {
    setWinStreak(await UserService.getWinStreak());
  };

  useEffect(() => {
    if (user) {
      getUserWords();
      getWords();
      getWinStreak();
    }
  }, [user]);

  const handleAddWord = async (wordId) => {
    await WordsService.addUserWord(wordId, difficulty);
    getUserWords();
    getWords();
  };

  const handleAddStat = async (wordId, stat) => {
    await WordsService.addWordStat(wordId, stat);
    getUserWords();
    getWords();
  };

  const handleWinStreakChange = (e) => setNewWinStreak(e.target.value);

  const handleSetWinStreak = async () => {
    await UserService.setWinStreak(newWinStreak);
    getWinStreak();
  };

  return (
    <Grid>
      <Grid className={classes.categoryContainer}>
        <Typography>All words with userInfo</Typography>
        <Grid className={classes.wordsContainer}>
          {words.map((word) => (
            <Grid key={word._id} container alignItems="center" className={classes.wordLine}>
              <Typography>{word.word}</Typography>
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
      <Grid className={classes.categoryContainer}>
        <Typography>Only user's words with userInfo</Typography>
        <Grid className={classes.wordsContainer}>
          {userWords.map((word) => (
            <Grid key={word._id} container className={classes.wordLine}>
              <Typography>{word.word}</Typography>
              <Grid container className={classes.wordStat} alignItems="center">
                <Typography>Difficulty: {word.userWord.difficulty}</Typography>
                <Typography>Fail: {word.userWord.optional.fail || 0}</Typography>
                <IconButton onClick={() => handleAddStat(word._id, WORD_STATS.FAIL)}>
                  <AddIcon />
                </IconButton>
                <Typography>Success: {word.userWord.optional.success || 0}</Typography>
                <IconButton onClick={() => handleAddStat(word._id, WORD_STATS.SUCCESS)}>
                  <AddIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid className={classes.categoryContainer}>
        <Typography>Win streak: {winStreak}</Typography>
        <TextField value={newWinStreak} type="number" onChange={handleWinStreakChange} />
        <Button onClick={handleSetWinStreak} color="primary" variant="contained">
          Set new win streak
        </Button>
      </Grid>
    </Grid>
  );
};
