import React from 'react';

import CardTeam from '../../components/partials/CardTeam';

import { Grid } from '@material-ui/core';

export default function About() {
  const teamArray = [
    {
      name: 'Игорь Захаров',
      img: './images/team/ig.jpg',
      position: 'Team Lead',
      description: 'Частичная реализация функций электронного учебника, Словарь, Оформление приложения',
      git: 'i3-code',
    },
    {
      name: 'Евгений Колоницкий',
      img: './images/team/zen.jpg',
      position: 'Front-end developer',
      description: 'Back-end, Авторизация пользователя, Синхронизация локальных и сетевых данных',
      git: 'drd1esel',
    },
    {
      name: 'Кристина Кашевар',
      img: './images/team/kris.jpg',
      position: 'Front-end developer',
      description: 'Электронный учебник, Оформление статистики, Игра "Картинки"',
      git: 'christina-kashevar',
    },
    {
      name: 'Ольга Хмыль',
      img: './images/team/ol.jpeg',
      position: 'Front-end developer',
      description: 'Игра "Сортировка", Unit-tests, Запись видео для приложения, Оформление приложения',
      git: 'volha010892',
    },
    {
      name: 'Денис Корзун',
      img: './images/team/den.jpeg',
      position: 'Front-end developer',
      description: 'Игра "Саванна", Игра "Аудиовызов", Redux state некоторых игр',
      git: 'dzianiskor',
    },
    {
      name: 'Филипп Бурш',
      img: './images/team/fil.jpg',
      position: 'Front-end developer',
      description: 'Игра "Спринт"',
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
