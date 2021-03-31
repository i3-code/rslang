import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
    marginTop: 50,
},
currentLevel:{
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
level:{
    marginTop: 50,
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
},
button: {
    margin: 3,
    padding: 3,
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