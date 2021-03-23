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
}));

export default useStyles;
