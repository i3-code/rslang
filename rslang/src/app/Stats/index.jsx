import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import Menu from '../../components/Menu';

export default function Stats() {
  return (
    <Grid>
      <Container>
        <Typography variant="h2">Stats</Typography>
        <Menu />
      </Container>
    </Grid>
  );
}
