import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'auto',
    cursor: 'pointer',
  },
  avatarIcon: {
    borderRadius: '50%',
    objectFit: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  drawer: {
    maxWidth: '100%',
  },
}));

export default useStyles;
