import { makeStyles } from '@material-ui/core';

const loadingBackground = 'rgba(255,255,255,0.5)';

const styles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: loadingBackground,
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 999,
  },
  loader: {
    zIndex: 1000,
  },
  fixed: {
    position: 'fixed',
  },
});

export default styles;
