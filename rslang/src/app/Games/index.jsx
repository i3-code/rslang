import React, { useCallback, useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import Card from '../../components/partials/Card';
import Savannah from './Savannah';
import Sprint from './Sprint';
import MyGame from './MyGame';
import AudioCall from './AudioCall';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/partials/Loading';

import { deletedWords, setLearnedWords } from '../../redux/appSlice';

import fetchPage from '../../functions/fetchPage';

import { WORDS_ON_PAGE } from '../../constants';

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

const games = (game, words) => {
  switch(game) {
    case('savannah'):
      return <Savannah words={words} />
    case('sprint'):
      return <Sprint words={words} />
    case('audiocall'):
      return <AudioCall words={words} />
    case('sort'):
      return <MyGame words={words} />
    default:
      return (
        <Container>
          <Grid container direction="row" justify="space-evenly" alignItems="center">
            {cardsArray.map((card, i) => (
              <Card key={card.name} {...card} />
            ))}
          </Grid>
        </Container>
      );
  }
};

export default function Games(props) {
  const {game, group, page} = props?.match?.params;
  const [loading, setLoading] = useState(true);
  const [crawledPage, setCrawledPage] = useState(Number(page));
  const [words, setWords] = useState([]);
  const dispatch = useDispatch();

  const deletedWordsList = useSelector(deletedWords);

  const filterFunc = useCallback((crawledPage, id) => {
    const deletedArray = deletedWordsList[Number(group)][crawledPage] || [];
    return !deletedArray.includes(id);
  }, [deletedWordsList, group]);

  useEffect(() => {
    const asyncCrawler = async () => {
      if (group && words.length < WORDS_ON_PAGE && crawledPage >= 0) {
        const reqWords = await fetchPage(group, crawledPage);
        const cWords = reqWords.filter((word) => filterFunc(crawledPage, word.id));
        const newWords = words.concat(cWords).slice(0, WORDS_ON_PAGE);
        setWords(newWords);
        setCrawledPage(crawledPage - 1);
      } else {
        words.forEach(word => {
          const {group, page, id} = word;
          dispatch(setLearnedWords({groupNum: group, pageNum: +page + 1, id}));
        });
        setLoading(false);
      }
    };

    if (loading) asyncCrawler();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, crawledPage]);

  return (loading) ? <Loading /> : games(game, words);
}
