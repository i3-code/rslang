import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import Menu from '../../components/Menu';

export default function Book() {
  return (
    <Grid>
      <Container>
        <Typography variant="h2">Book</Typography>
        <Menu />
      </Container>
    </Grid>
  );
}
