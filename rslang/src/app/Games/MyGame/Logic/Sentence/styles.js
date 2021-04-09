import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root:{
    marginTop: '-5em',
  },
    buttonRight: {
      marginTop: '2em',
      padding: 3,
      margin: 3,
    background: 'linear-gradient(45deg,#2ed8b6,#59e0c5)',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    display: 'flex',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
        fontSize: 10,
      },
      [theme.breakpoints.between('sm', 'md')]: {
        fontSize: 12,
      },
      [theme.breakpoints.between('md', 'lg')]: {
        fontSize: 15,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: 20,
      },
},
buttonNext: {
  marginTop: '2em',
  margin: 3,
  padding: 3,
  background: 'linear-gradient(45deg,#FF5370,#ff869a)',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
  display: 'flex',
  fontWeight: 'bold',
  [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 12,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 15,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 20,
    },
  }}));

export default useStyles;
