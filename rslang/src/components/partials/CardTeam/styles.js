import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
        width: 300,
      },
      [theme.breakpoints.between('sm', 'md')]: {
        width: 400,
      },
      [theme.breakpoints.between('md', 'lg')]: {
        width: 500,
      },
      [theme.breakpoints.up('lg')]: {
        width: 600,
      },
  },
  details: {
      [theme.breakpoints.up('sm')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
      }
  },
  media: {
    [theme.breakpoints.down('sm')]: {
        height: 150,
        width: 300,
        fontSize: 10,
      },
      [theme.breakpoints.between('sm', 'md')]: {
        height: 200,
        width: 200,
      },
      [theme.breakpoints.between('md', 'lg')]: {
        height: 250,
        width: 250,
      },
      [theme.breakpoints.up('lg')]: {
        height: 300,
        width: 300,
      },
    },
   name: {
       fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
      [theme.breakpoints.between('sm', 'md')]: {
        fontSize: 16,
      },
      [theme.breakpoints.between('md', 'lg')]: {
        fontSize: 20,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: 26,
      },
  },
  position: {
      color: '#897F7F',
    [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      },
      [theme.breakpoints.between('sm', 'md')]: {
        fontSize: 14,
      },
      [theme.breakpoints.between('md', 'lg')]: {
        fontSize: 18,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: 22,
      },
  },
  description: {
    [theme.breakpoints.down('sm')]: {
        fontSize: 10,
      },
      [theme.breakpoints.between('sm', 'md')]: {
        fontSize: 12,
      },
      [theme.breakpoints.between('md', 'lg')]: {
        fontSize: 16,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: 20,
      },
  },
}));

export default useStyles;