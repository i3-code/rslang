import { makeStyles } from '@material-ui/core/styles';
import image from './img/photo.jpg'

const useStyles = makeStyles((theme) => ({
  root:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${image})`,
    minHeight: '80vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  wrapper: {
    background: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    minHeight: '80vh',
    position: 'relative',
  }
}));

export default useStyles;
