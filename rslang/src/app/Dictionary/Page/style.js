import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderRadius: 10,
    padding: '0 10px',
    boxShadow: '0px 0px 21px 2px rgba(34, 60, 80, 0.2)',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      paddingTop: 10,
      maxWidth: 550,
      marginRight: 'auto',
      marginLeft: 'auto',
    },
  },
  content: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 0,
    },
  },
  hard: {
    boxShadow: '0px 0px 21px 2px rgba(254, 0, 0, 0.2) inset',
  },
  media: {
    width: 120,
    height: 120,
    display: 'flex',
    flexShrink: 0,
    borderRadius: '50%',
  },
  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      paddingBottom: 10,
    },
  },
  word: {
    fontWeight: 900,
    color: 'blue',
  },
  bottomLine: {
    marginBottom: 6,
  },
  text: {
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
    },
  },
  actionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  blue: {
    border: '2px solid #4099ff',
    color: '#4099ff',
  },
  turquoise: {
    border: '2px solid #2ed8b6',
    color: '#2ed8b6',
  },
  orange: {
    border: '2px solid #ffb64d',
    color: '#ffb64d',
  },
  pink: {
    border: '2px solid #ff5370',
    color: '#ff5370',
  },
  violet: {
    border: '2px solid #c882e2',
    color: '#c882e2',
  },
  yellow: {
    border: '2px solid #f9f53e',
    color: '#f9f53e',
  },
  pagination: {
    marginTop: theme.spacing(2),
    '& > ul': {
      justifyContent: 'center',
    },
  },
}));

export default useStyles;
