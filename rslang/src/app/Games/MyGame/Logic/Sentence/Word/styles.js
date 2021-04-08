import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  word: {
    color: 'red',
    border: 'solid 1px black ',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    display: 'flex',
    fontWeight: 'bold',
    lineHeight: 1.2,
  [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      margin: 1,
      padding: 3,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 15,
      margin: 2,
      padding: 5,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 18,
      margin: 3,
      padding: 10,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 23,
      margin: 3,
      padding: 10,
    },
},
    cell: {
    border: 'solid 1px black ',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    display: 'flex',
    fontWeight: 'bold',
    lineHeight: 1.2,
  [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      margin: 1,
      padding: 3,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 15,
      margin: 2,
      padding: 5,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 18,
      margin: 3,
      padding: 10,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 23,
      margin: 3,
      padding: 10,
    },
}}));

export default useStyles;
