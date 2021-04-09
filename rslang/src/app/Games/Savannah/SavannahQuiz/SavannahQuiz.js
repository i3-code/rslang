import SavannahQuestion from './SavannahQuestion/SavannahQuestion';
import SavannahAnswers from './SavannahAnswers/SavannahAnswers';
import LinearDeterminate from '../../components/LinearDeterminate/LinearDeterminate';
import Circular from '../../components/Circular/Circular';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { selectPercentRightAnswers, selectProgress } from '../savannahSlice';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    marginTop: '2em',
  },
});

const SavannahQuiz = () => {
  const classes = useStyles();
  const progress = useSelector(selectProgress);
  const percentRightAnswers = useSelector(selectPercentRightAnswers);

  return (
    <Grid className={classes.root}>
      <LinearDeterminate progress={progress} />
      <SavannahQuestion />
      <SavannahAnswers />
      <Circular percentRightAnswers={percentRightAnswers} />
    </Grid>
  );
};

export default SavannahQuiz;
