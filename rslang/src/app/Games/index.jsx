import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import Menu from '../../components/Menu';

export default function Games() {
  return (
    <Grid>
      <Container>
        <Typography variant="h2">Games</Typography>
        <Menu />
      </Container>
    </Grid>
  );
}
