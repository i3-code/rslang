import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      width: 300,
    },
    [theme.breakpoints.between('sm', 'md')]: {
        width: 345,
    },
    [theme.breakpoints.between('md', 'lg')]: {
        width: 400,
    },
    [theme.breakpoints.up('lg')]: {
        width: 400,
    },
  },
  media: {
    height: 140,
  },
}));

export default useStyles;