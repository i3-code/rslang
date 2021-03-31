import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    cell: {
    margin: 3,
    marginBottom: 50,
    padding: 10,
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
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 15,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 18,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 23,
    },
}}));

export default useStyles;
