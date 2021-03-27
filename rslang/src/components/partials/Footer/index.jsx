import React from 'react';
import useStyles from './styles';
import { useLocation } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Button, IconButton, Typography } from '@material-ui/core';

const gitHubs = ['volha010892', 'DrD1esel', 'Christina-Kashevar', 'i3-code', 'dzianiskor', 'Heliken'];

export default function Footer() {
  const location = useLocation();
  const classes = useStyles();

  if (location.pathname.includes('/games')) return <div />;

  return (
    <Grid className={classes.root}>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Grid>
            {gitHubs.map((git) => (
              <Button
                variant="text"
                component="a"
                href={`https://github.com/${git}`}
                target="blank"
                rel="noreferrer noopener"
                key={git}
                className={classes.button}
              >
                <Typography className={classes.text}>{git}</Typography>
              </Button>
            ))

            }
          </Grid>
          <Grid>
            <IconButton
              component="a"
              href="https://rs.school/js/"
              target="blank"
              rel="noreferrer noopener"
            >
              <img src="https://rs.school/images/rs_school.svg" alt="RS School logo" className={classes.logoImage}/>
            </IconButton>
            <Typography variant="button" color="initial" className={classes.year}>2021</Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
