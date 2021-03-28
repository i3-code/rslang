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

const storageInfo = localStorage.getItem('rslang20') ? JSON.parse(localStorage.getItem('rslang20'))
: {page: 0, group: 0}

export default function CountryCard({name, desc = '', img, background, index, link = '#', book}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Link to={book ? "/page" : link} className={classes.link}>
    <Box mt={2} mb={2} onClick={(e)=> {
      storageInfo.group = index
      storageInfo.page = 0
      localStorage.setItem('rslang20', JSON.stringify(storageInfo))
      dispatch(setGroup({groupNum: index}))
      }}>
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
