import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  btnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(1),
  },
  btn: {
    marginRight: theme.spacing(1),
  },
  bookWrapper: {
    paddingBottom: theme.spacing(1),
  },
  pagination: {
    marginTop: theme.spacing(2),
    '& > ul': {
      justifyContent: 'center',
    },
  },
  link: {
    padding: theme.spacing(1),
    backgroundColor: '#3f51b5',
    color: '#fff',
    width: 120,
    textAlign: 'center',
    borderRadius: 10,
    [theme.breakpoints.down('sm')]: {
      width: 'initial',
    },
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  linkwrapper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-around',
  },
  notActive: {
    cursor: 'not-allowed',
  },
}));

export default useStyles;
