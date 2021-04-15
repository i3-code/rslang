import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    start: {
        display: 'flex', 
        alignItems: 'center',   
        justifyContent: 'space-around', 
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
        }
      },
      content:{
          textAlign: 'center',
          fontWeight: 900,
          lineHeight: 1.2,
        [theme.breakpoints.down('sm')]: {
            fontSize: 25,
            width: '100%',
          },
          [theme.breakpoints.between('sm', 'md')]: {
            fontSize: 30,
            width: '100%',
          },
          [theme.breakpoints.between('md', 'lg')]: {
            fontSize: 25,
            width: 400,
          },
          [theme.breakpoints.up('lg')]: {
            fontSize: 30,
            width: 550,
          },
      },
    cover: { 
        [theme.breakpoints.down('sm')]: {
            width: 300,
            height: 200,
          },
          [theme.breakpoints.between('sm', 'md')]: {
            width: 400,
            height: 200,
          },
          [theme.breakpoints.between('md', 'lg')]: {
            width: 400,
            height: 260,
          },
          [theme.breakpoints.up('lg')]: {
            width: 600,
            height: 350,
          },

      },
      advantage:{
        textAlign: 'center',
        fontWeight: 300,
        lineHeight: 1.2,
       
      [theme.breakpoints.down('sm')]: {
        fontSize: 15,
        width: '100%',
        },
        [theme.breakpoints.between('sm', 'md')]: {
            fontSize: 20,
            width: 500,
        },
        [theme.breakpoints.between('md', 'lg')]: {
            fontSize: 18,
            width: 650,
        },
        [theme.breakpoints.up('lg')]: {
          fontSize: 20,
          width: 720,
        },
      },
      container:{
        [theme.breakpoints.up('md')]: {
            width: 900,
      },
    },
      title:{
          width: '100%',
          textAlign: 'center',
          fontWeight: 900,
          lineHeight: 1.2,
        [theme.breakpoints.down('sm')]: {
            fontSize: 25,
          },
          [theme.breakpoints.between('sm', 'md')]: {
            fontSize: 30,
          },
          [theme.breakpoints.between('md', 'lg')]: {
            fontSize: 25,
          },
          [theme.breakpoints.up('lg')]: {
            fontSize: 30,
          },
      },
      description:{
        width: '100%',
        textAlign: 'center',
        fontWeight: 300,
        lineHeight: 1.2,
      [theme.breakpoints.down('sm')]: {
          fontSize: 15,
        },
        [theme.breakpoints.between('sm', 'md')]: {
          fontSize: 20,
        },
        [theme.breakpoints.between('md', 'lg')]: {
          fontSize: 15,
        },
        [theme.breakpoints.up('lg')]: {
          fontSize: 20,
        },
    },
    book:{
        display: 'flex', 
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',   

    },
    bookImg:{
        marginBottom: 10,
        [theme.breakpoints.down('sm')]: {
            width: 300,
            height: 190,
          },
          [theme.breakpoints.between('sm', 'md')]: {
            width: 480,
            height: 300,
          },
          [theme.breakpoints.between('md', 'lg')]: {
            width: 600,
            height: 370,
          },
          [theme.breakpoints.up('lg')]: {
            width: 800,
            height: 500,
          },
    }
}));

export default useStyles;
