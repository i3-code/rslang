import React from 'react';

import useStyles from './styles';
import Card1 from '../../components/partials/Card';

import { Grid, Typography, Card, CardContent, CardMedia, Box } from '@material-ui/core';

export default function Home() {
  const classes = useStyles();
  const cardsArray = [
    {
      img: './images/games/savannah.jpg',
      name: 'Саванна',
      background: 'linear-gradient(45deg,#F9F53E,#FBF969)',
      toLink: false,
    },
    {
      img: './images/games/audiocall.jpg',
      name: 'Аудиовызов',
      background: 'linear-gradient(45deg,#4099ff,#73b4ff)',
      toLink: false,
    },
    {
      img: './images/games/sprint.jpg',
      name: 'Спринт',
      background: 'linear-gradient(45deg,#FF5370,#ff869a)',
      toLink: false,
    },
    {
      img: './images/4.jpg',
      name: 'Своя игра',
      background: 'linear-gradient(45deg,#2ed8b6,#59e0c5)',
      toLink: false,
    },
  ];
  return (
    <Grid container direction="column" alignItems="center">
      <Card className={classes.start}>
        <CardContent>
          <Typography paragraph className={classes.content}>
            Прокачай английский в онлайн-школе RS School
          </Typography>
        </CardContent>
        <CardMedia className={classes.cover} image="./images/mainPage/mainPage.jpg" title="Learning English" />
      </Card>
      <Box mt={10}  className={classes.advantage}>
        Мы создали это приложение для всех, кто хочет знать английский язык. Здесь есть все необходимое для того, чтобы
        изучать английские слова онлайн: мини-игры, электронный учебник, отслеживания индивидуального прогресса.
      </Box>
      <Box mt={10} className={classes.container}>
        <Typography paragraph className={classes.title}>
          Игры
        </Typography>
        <Typography paragraph className={classes.description}>
          С помощью игр слова запоминаются быстро и легко
        </Typography>
        <Grid container direction="row" justify="space-evenly" alignItems="center">
          {cardsArray.map((card) => (
            <Card1 key={card.name} {...card} />
          ))}
        </Grid>
      </Box>
      <Box mt={10} className={classes.container}>
        <Card className={classes.book}>
          <CardContent>
            <Typography paragraph className={classes.title}>
              Электронный учебник
            </Typography>
            <Typography paragraph className={classes.description}>
              Поможет увеличить словарный запас или вспомнить забытые слова
            </Typography>
          </CardContent>
          <CardMedia className={classes.bookImg} image="./images/mainPage/book.png" title="Book" />
        </Card>
      </Box>
      <Box mt={10} className={classes.container}>
        <Card className={classes.book}>
          <CardContent>
            <Typography paragraph className={classes.title}>
              Статистика прогресса
            </Typography>
            <Typography paragraph className={classes.description}>
              На странице статистики отображается краткосрочная статистика по результатам каждого дня и долгосрочная
              статистика за весь период изучения
            </Typography>
          </CardContent>
          <CardMedia className={classes.cover} image="./images/mainPage/statistic.png" title="Book" />
        </Card>
      </Box>
      <Box mt={10} className={classes.container}>
        <Card className={classes.book}>
          <CardContent>
            <Typography paragraph className={classes.title}>
              Видео
            </Typography>
            <Typography paragraph className={classes.description}>
              Как пользоваться приложением
            </Typography>
          </CardContent>
          <CardMedia className={classes.cover} image="./images/mainPage/statistic.png" title="Book" />
        </Card>
      </Box>
    </Grid>
  );
}
