import AudioQuestion from './AudioQuestion/AudioQuestion';
import AudioCallAnswers from './AudioCallAnswers/AudioCallAnswers';
import LinearDeterminate from '../../components/LinearDeterminate/LinearDeterminate';
import Circular from '../../components/Circular/Circular';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { selectPercentRightAnswers, selectProgress } from '../../Savannah/savannahSlice';

const useStyles = makeStyles({
  root: {
    marginTop: '2em',
  },
});


const AudioCallQuiz = () => {
  const classes = useStyles();
  const progress = useSelector(selectProgress);
  const percentRightAnswers = useSelector(selectPercentRightAnswers);

  return (
    <Grid className={classes.root}>
      <LinearDeterminate progress={progress} />
      <AudioQuestion />
      <AudioCallAnswers />
      <Circular percentRightAnswers={percentRightAnswers} />
    </Grid>
  );
};

export default AudioCallQuiz;
