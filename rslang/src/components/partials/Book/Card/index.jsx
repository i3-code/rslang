import React from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function CountryCard({groupNumber, name, img, background}) {
  const history = useHistory();
  const classes = useStyles();

  function handleClick() {
   // history.push(`/book/${}`);
  }
  return (
    <Box mt={2} mb={2}>
      <Card className={classes.root} onClick={handleClick}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={img}
            title="Contemplative Reptile"
          />
          <CardContent  style={{background: `${background}`}}>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" component="p">
              600 слов
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}