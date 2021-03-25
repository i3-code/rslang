import React from 'react';

import CardTeam from '../../components/partials/CardTeam';

import { Grid } from '@material-ui/core';

export default function About() {
  const teamArray = [
    {
      name: 'Игорь Захаров',
      img: './images/team/ig.jpg',
      position: 'Team Lead',
      description: 'kjnjklnjlkjnlk',
      git: 'i3-code',
    },
    {
      name: 'Евгений Колоницкий',
      img: './images/team/zen.jpg',
      position: 'Front-end developer',
      description: 'kjnjklnjlkjnlk',
      git: 'drd1esel',
    },
    {
      name: 'Кристина Кашевар',
      img: './images/team/kris.jpg',
      position: 'Front-end developer',
      description: 'kjnjklnjlkjnlk',
      git: 'christina-kashevar',
    },
    {
      name: 'Ольга Хмыль',
      img: './images/team/ol.jpeg',
      position: 'Front-end developer',
      description: 'kjnjklnjlkjnlk',
      git: 'volha010892',
    },
    {
      name: 'Денис Корзун',
      img: './images/team/den.jpeg',
      position: 'Front-end developer',
      description: 'kjnjklnjlkjnlk',
      git: 'dzianiskor',
    },
    {
      name: 'Филипп Бурш',
      img: './images/team/fil.jpg',
      position: 'Front-end developer',
      description: 'kjnjklnjlkjnlk',
      git: 'heliken',
    },
  ];
  return (
    <Grid container direction="row" justify="space-evenly" alignItems="center">
      {teamArray.map((el, i) => (
        <CardTeam
          key={i}
          name={el.name}
          img={el.img}
          position={el.position}
          description={el.description}
          git={el.git}
        />
      ))}
    </Grid>
  );
}
