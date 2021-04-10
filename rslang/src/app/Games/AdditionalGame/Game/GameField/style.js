import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
  },
  cards: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  media: {
    width: 250,
    height: 200,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    border: '1px solid transparent',
    '&:hover': {
      border: '1px solid #fff'
    }
  },
  correct: {
    boxShadow: '0 0 15px #0bf71f',
  },
  wrong: {
    boxShadow: '0 0 15px #d70909',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
  },
  word: {
    textAlign: 'center',
    fontSize: '40px',
    textShadow: '3px 3px 2px #000'
  },
  example: {
    textAlign: 'center',
    fontSize: '20px',
    margin: '10px 0',
    textShadow: '3px 3px 2px #000'
  },
}));

export default useStyles;
