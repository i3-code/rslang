import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appbar:{
    background: 'white',
    position: 'static',
  },
  svgicon:{
    [theme.breakpoints.up('lg')]: {
    fontSize: 60
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 60
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 50
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 30
      },
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  signupLink: {
    color: 'white',
    textDecoration: 'none',
    marginLeft: 20,
  },
  collapse: {
    display: 'flex',
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
  },
  smallScreen: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    },
  },
  iconButton: {
    alignSelf: 'center'
  },
  drawer: {
    minWidth: 250,
    maxWidth: 300,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  }
}));

export default useStyles;