import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import Card from '../../components/partials/Book/Card';

const cardsArray = [
  { img: './images/1.jpg', name: 'Коллекция 1', background: 'linear-gradient(45deg,#4099ff,#73b4ff)' },
  { img: './images/2.jpg', name: 'Коллекция 2', background: 'linear-gradient(45deg,#2ed8b6,#59e0c5)' },
  { img: './images/3.jpg', name: 'Коллекция 3', background: 'linear-gradient(45deg,#FFB64D,#ffcb80)' },
  { img: './images/4.jpg', name: 'Коллекция 4', background: 'linear-gradient(45deg,#FF5370,#ff869a)' },
  { img: './images/5.png', name: 'Коллекция 5', background: 'linear-gradient(45deg,#C882E2,#C376DF)' },
  { img: './images/4.png', name: 'Коллекция 6', background: 'linear-gradient(45deg,#F9F53E,#FBF969)' },
];

export default function Book() {
  return (
    <Grid>
      <Typography variant="h4">Book</Typography>
      <Container>
        <Grid container direction="row" justify="space-evenly" alignItems="center" >
          {cardsArray.map((card, i) => (
            <Card key={card.name} groupNumber={i} {...card} />
          ))}
        </Grid>
      </Container>
    </Grid>
  );
}
