import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  categoryContainer: {
    marginBottom: 20,
    padding: 10,
    border: '1px solid black',
  },
  wordsContainer: {
    marginTop: 10,
    padding: 10,
    maxHeight: 250,
    overflowY: 'scroll',
    border: '1px solid blue',
  },
  wordLine: {
    marginBottom: 10,
    '& > :first-child': {
      width: 150,
    },
  },
  wordStat: {
    width: 'auto',
    '& > *': { marginRight: 20 },
  },
  add: {
    marginRight: 10
  }
}));

export default useStyles;
