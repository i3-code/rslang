import React from 'react';
import { Container, Grid } from '@material-ui/core';

import Card from '../../components/partials/Card';

export default function Book() {

const cardsArray = [
  { img: './images/1.jpg', name: 'Коллекция 1', background: 'linear-gradient(45deg,#4099ff,#73b4ff)', link: '/book/0'},
  { img: './images/2.jpg', name: 'Коллекция 2', background: 'linear-gradient(45deg,#2ed8b6,#59e0c5)', link: '/book/1'},
  { img: './images/3.jpg', name: 'Коллекция 3', background: 'linear-gradient(45deg,#ffb64d,#ffcb80)', link: '/book/2'},
  { img: './images/4.jpg', name: 'Коллекция 4', background: 'linear-gradient(45deg,#ff5370,#ff869a)', link: '/book/3'},
  { img: './images/5.png', name: 'Коллекция 5', background: 'linear-gradient(45deg,#c882e2,#c376df)', link: '/book/4'},
  { img: './images/4.png', name: 'Коллекция 6', background: 'linear-gradient(45deg,#f9f53e,#fbf969)', link: '/book/5'},
];

  return (
    <Container >
      <Grid container direction="row" justify="space-evenly" alignItems="center" >
        {cardsArray.map((card) => (
          <Card key={card.name} desc="600 слов" {...card} />
        ))}
      </Grid>
    </Container>
  );
}
