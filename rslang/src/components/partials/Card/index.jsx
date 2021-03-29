import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function CountryCard({ name, desc = '', img, background, link = ''}) {
  const classes = useStyles();

  return (
    <Link to={link} className={classes.link} replace={!link}>
      <Box mt={2} mb={2}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia className={classes.media} image={img} title={desc} />
            <CardContent style={{ background: `${background}` }}>
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
