import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 320,
      sm: 450,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  text: {
    fontSize: 14,
    [theme.breakpoints.down('xs')]: {
      fontSize: 8,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 12,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logoImage: {
    height: theme.spacing(3),
    width: 'auto',
  },
  year: {
    color: theme.palette.background.default,
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(1.5),
    },
  },
  button: {
    color: theme.palette.background.default,
  },
}));

export default useStyles;
