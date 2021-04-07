import React from 'react';
import { Container, Grid } from '@material-ui/core';
import Card from '../../components/partials/Card';
import Savannah from './Savannah';
import Sprint from './Sprint';
import MyGame from './MyGame';
import AudioCall from './AudioCall';

const cardsArray = [
  {
    img: './images/games/savannah.jpg',
    name: 'Саванна',
    background: 'linear-gradient(45deg,#F9F53E,#FBF969)',
    link: '/games/savannah',
  },
  {
    img: './images/games/audiocall.jpg',
    name: 'Аудиовызов',
    background: 'linear-gradient(45deg,#4099ff,#73b4ff)',
    link: '/games/audiocall',
  },
  {
    img: './images/games/sprint.jpg',
    name: 'Спринт',
    background: 'linear-gradient(45deg,#FF5370,#ff869a)',
    link: '/games/sprint',
  },
  {
    img: './images/4.jpg',
    name: 'Сортировка',
    background: 'linear-gradient(45deg,#2ed8b6,#59e0c5)',
    link: '/games/sort',
  },
];

const games = {
  savannah: <Savannah />,
  sprint: <Sprint />,
  sort: <MyGame/>,
  audiocall: <AudioCall />,
};

export default function Games(props) {
  const {game, group, page} = props?.match?.params;
  const gameName = games[game] || null;

  return (
    gameName || (
      <Container>
        <Grid container direction="row" justify="space-evenly" alignItems="center">
          {cardsArray.map((card, i) => (
            <Card key={card.name} {...card} />
          ))}
        </Grid>
      </Container>
    )
  );
}
