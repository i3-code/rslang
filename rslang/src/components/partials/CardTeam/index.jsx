import React from 'react';

import useStyles from './styles';

import { Grid, Button, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import GitHubIcon from '@material-ui/icons/GitHub';

export default function CardTeam({ name, img, position, description, git}) {

  const classes = useStyles();

  return (
    <Box mt={2} mb={2}>
      <Card className={classes.root}>
        <CardActionArea className={classes.details}>
          <CardMedia
            className={classes.media}
            image={img}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom className={classes.name}>
              {name}
            </Typography>
            <Typography gutterBottom className={classes.position}>
            {position}
            </Typography>
            <Typography variant="body2" component="p" className={classes.description}>
              {description}
            </Typography>
            <Grid>
            <Button
                variant="text"
                color="default"
                component="a"
                href={`https://github.com/${git}`}
                target="blank"
                rel="noreferrer noopener"
                startIcon={<GitHubIcon/>}
                key={git}
              >
              </Button>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}