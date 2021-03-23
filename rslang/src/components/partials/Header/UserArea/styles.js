import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button:{
        width: 40, height: 40,
        padding: 0,
    },
    icon: {
        width: 40, height: 40,
      },
  avatarIcon: {
    borderRadius: '50%',
  },
}));

export default useStyles;