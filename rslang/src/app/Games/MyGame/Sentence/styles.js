import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    answer:{
      height: 50,
      textAlign: 'center',
      marginBottom: 10,
      fontWeight: 'bold',
      color: 'red',
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
    button: {
    margin: 3,
    padding: 3,
    background: 'linear-gradient(45deg,#4099ff,#73b4ff)',
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
