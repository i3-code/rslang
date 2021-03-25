import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  profile: {
    width: '100vw',
    maxWidth: theme.spacing(55.5),
    padding: theme.spacing(3),
    '& > *': {},
  },
  username: {
    margin: theme.spacing(2, 0),
  },
  avatar: {
    width: '100%',
    maxHeight: 400,
    objectFit: 'contain',
    borderRadius: '50%',
  },
}));

export default useStyles;
