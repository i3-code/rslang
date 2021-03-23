import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import Footer from '../../components/partials/Footer';
import Menu from '../../components/Menu';

export default function Home() {
  return (
    <Grid>
      <Container>
        <Typography variant="h2">Home</Typography>
        <Menu />
        <Footer/>
      </Container>
    </Grid>
  );
}
