import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

export default function Menu() {
  return (
    <Grid>
      <Link to="/">
        Home
      </Link>
      <Link to="/book">
        Textbook
      </Link>
      <Link to="/games">
        Games
      </Link>
      <Link to="/stats">
        Statistics
      </Link>
    </Grid>
  );
}

