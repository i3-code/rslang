import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    bottom: '15%',
    textAlign: 'center',
    right: 0,
    left: 0,
  },
  title: {
    color: 'white',
    paddingBottom: '10px',
  },
  typography: {
    color: 'white',
    fontSize: '18px',
  },
});

function CircularProgressWithLabel(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>Правильных ответов:</div>
      <Box position="relative" display="inline-flex">
        <CircularProgress style={{ width: '80px', height: '80px' }} variant="determinate" {...props} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            className={classes.typography}
            variant="caption"
            component="div"
            color="textSecondary"
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    </div>
  );
}

export default function Circular({ percentRightAnswers }) {
  return <CircularProgressWithLabel value={percentRightAnswers} />;
}
