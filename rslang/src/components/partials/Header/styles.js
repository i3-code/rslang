import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  collapse: {
    display: 'flex',
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
  },
}));

export default useStyles;