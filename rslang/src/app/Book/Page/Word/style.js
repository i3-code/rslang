import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderRadius: 10,
    padding: '0 10px',
    boxShadow: '0px 0px 21px 2px rgba(34, 60, 80, 0.2)'
  },
  hard: {
    boxShadow: '0px 0px 21px 2px rgba(254, 0, 0, 0.2) inset'
  },
  media: {
    width: 120,
    height: 120,
    borderRadius: '50%',
  },
  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  word: {
    fontWeight: 900,
    color: 'blue'
  },
  bottomLine: {
    marginBottom: 6,
  }
  })
);

export default useStyles;
