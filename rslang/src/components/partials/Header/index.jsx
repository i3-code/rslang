import React from 'react';

import UserArea from './UserArea';

import useStyles from './styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';


export default function Header() {
  const classes = useStyles();

  return (
      <AppBar className={classes.appbar}>
        <Toolbar>
          <Grid className={classes.collapse}>
           <UserArea />
          </Grid>
        </Toolbar>
      </AppBar>
  );
}