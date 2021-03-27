import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 730,
      md: 1080,
      lg: 1280,
      xl: 1920,
    },
  },
})

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
    boxShadow: '0px 0px 21px 2px rgba(254, 0, 0, 0.2) inset'
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
    color: 'blue'
  },
  bottomLine: {
    marginBottom: 6,
  },
  text:{
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
    },
  },
  actionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
  })
);

export default useStyles;
