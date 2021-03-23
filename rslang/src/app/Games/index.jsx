import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import Menu from '../../components/Menu';
import {NavLink} from "react-router-dom";

export default function Games() {
  return (
    <Grid>
      <Container>
        <Typography variant="h2">Games</Typography>
        <Menu />
        <NavLink
          to="/games/savannah"
        >Savannah</NavLink>
      </Container>
    </Grid>
  );
}
