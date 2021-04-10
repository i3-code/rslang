import React from 'react';
import { Container, Grid } from '@material-ui/core';
import Card from '../../components/partials/Card';
import Savannah from './Savannah';
import Sprint from './Sprint';
import MyGame from './MyGame';
import AudioCall from './AudioCall';
import AdditionalGame from './AdditionalGame';

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
  {
    img: './images/2.jpg',
    name: 'Картинки',
    background: 'linear-gradient(45deg,#C882E2,#C376DF)',
    link: '/games/pictures',
  },
];

const games = {
  savannah: <Savannah />,
  sprint: <Sprint />,
  sort: <MyGame/>,
  audiocall: <AudioCall />,
  pictures: <AdditionalGame />,
};

export default function Games(props) {
  const gameName = props?.match?.params?.game;
  const game = games[gameName];

  return (
    game || (
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
