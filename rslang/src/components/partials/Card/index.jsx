import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { setGroup } from '../../../app/Book/bookSlice';
import { useDispatch } from 'react-redux';

export default function CountryCard({name, desc = '', img, background, index, link = '#'}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Link to="/page" className={classes.link}>
    <Box mt={2} mb={2} onClick={(e)=> dispatch(setGroup({groupNum: index}))}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={img}
            title={desc}
          />
          <CardContent style={{background: `${background}`}}>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" component="p">
              {desc}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
    </Link>
  );
}
