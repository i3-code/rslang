import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  btnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(1),
  },
  btn: {
    marginRight: theme.spacing(1),
  },
  bookWrapper: {
    paddingBottom: theme.spacing(7),
  },
  pagination: {
    marginTop: theme.spacing(2),
    '& > ul': {
      justifyContent: 'center',
    }
  }
})
)

export default useStyles;
