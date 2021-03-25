import React from 'react';
import { Container, Grid } from '@material-ui/core';
import Card from '../../components/partials/Card';
import Savannah from './Savannah';

const cardsArray = [
  { img: './images/1.jpg', name: 'Саванна', background: 'linear-gradient(45deg,#F9F53E,#FBF969)', link: '/games/savannah'},
  { img: './images/2.jpg', name: 'Аудиовызов', background: 'linear-gradient(45deg,#4099ff,#73b4ff)', link: '/games/audiocall' },
  { img: './images/3.jpg', name: 'Спринт', background: 'linear-gradient(45deg,#FF5370,#ff869a)', link: '/games/sprint' },
  { img: './images/4.jpg', name: 'Своя игра', background: 'linear-gradient(45deg,#2ed8b6,#59e0c5)', link: '/games/ourgame' },
];

const games = {
  savannah: <Savannah />
}

export default function Games(props) {
  const  gameName = props?.match?.params?.game;
  const game = games[gameName];

  return game || (
      <Container>
        <Grid container direction="row" justify="space-evenly" alignItems="center" >
          {cardsArray.map((card, i) => (
            <Card key={card.name} {...card} />
          ))}
        </Grid>
      </Container>
  );
}
