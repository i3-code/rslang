import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import Menu from '../../components/Menu';
import Footer from '../../components/partials/Footer';

export default function Book() {
  return (
    <Grid>
      <Container>
        <Typography variant="h2">Book</Typography>
        <Menu />
        <Footer/>
      </Container>
    </Grid>
  );
}
