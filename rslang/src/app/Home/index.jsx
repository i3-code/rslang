import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import Menu from '../../components/Menu';

export default function Home() {
  return (
    <Grid>
      <Container>
        <Typography variant="h2">Home</Typography>
        <Menu />
      </Container>
    </Grid>
  );
}
