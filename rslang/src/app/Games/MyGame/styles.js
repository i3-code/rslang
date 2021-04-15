import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${'https://www.njsca.org/s/ZOOMs-chalkboard.png'})`,
    height: '80vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
      },

}));

export default useStyles;
