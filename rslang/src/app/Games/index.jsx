import React from 'react';
import { Container, Grid } from '@material-ui/core';
import Card from '../../components/partials/Card';

const cardsArray = [
  { img: './images/1.jpg', name: 'Саванна', background: 'linear-gradient(45deg,#F9F53E,#FBF969)' },
  { img: './images/2.jpg', name: 'Аудиовызов', background: 'linear-gradient(45deg,#4099ff,#73b4ff)' },
  { img: './images/3.jpg', name: 'Спринт', background: 'linear-gradient(45deg,#FF5370,#ff869a)' },
  { img: './images/4.jpg', name: 'Своя игра', background: 'linear-gradient(45deg,#2ed8b6,#59e0c5)' },
];

export default function Games() {
  return (
      <Container>
        <Grid container direction="row" justify="space-evenly" alignItems="center" >
          {cardsArray.map((card, i) => (
            <Card key={card.name} {...card} />
          ))}
        </Grid>
      </Container>
  );
}
