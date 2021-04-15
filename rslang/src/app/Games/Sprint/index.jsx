import React, { useState } from 'react';
import axios from 'axios';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Grid } from '@material-ui/core';
import StartGameMenu from '../components/StartGameMenu/StartGameMenu';
import ResultGame from '../components/ResultGame/ResultGame';
import SprintGame from './SprintGame';
import Loading from '../../../components/partials/Loading';
import LevelDifficult from '../components/LevelDifficult/LevelDifficult';
import ButtonFullScreen from '../components/ButtonFullScreen/ButtonFullScreen';
import { shuffle } from '../../../functions/math';
import './styles.css';

const Sprint = ({ fullScreenHandler, words }) => {
  const [shuffledWords, setShuffledWords] = useState(words?.length ? shuffle(words) : null);
  const [shouldLoadWords] = useState(!words?.length);
  const [gameState, setGameState] = useState('start');
  const [answersResults, setAnswersResults] = useState({ right: [], wrong: [] });
  const [result, setResult] = useState(null);
  const [level, setLevel] = useState(0);
  const resultComponent = (
    <ResultGame
      rightAnswers={answersResults.right}
      wrongAnswers={answersResults.wrong}
      restartGame={() => setGameState('game')}
      result={result}
    />
  );
  const gameComponent = (
    <SprintGame
      setGameState={setGameState}
      gameState={gameState}
      setResult={setResult}
      setAnswersResults={setAnswersResults}
      words={shuffledWords}
    />
  );
  const startGame = async () => {
    if (shouldLoadWords) {
      setGameState('loading');
      await axios.get(`https://react-rslang.herokuapp.com/words?group=${level}`).then((res) => {
        setShuffledWords(shuffle(res.data));
        setGameState('game');
      });
    } else {
      setGameState('game');
    }
  };
  const startComponent = (
    <Grid style={{ textAlign: 'center' }} className="sprint-start-menu">
      <StartGameMenu
        title="Спринт"
        note='Суть проста: в игровом поле появляются английские слова, к которым предлагается перевод. Задача "спринтера" — определить, верен предложенный перевод или нет. И все это — на время!'
        startGame={() => startGame()}
        colorText="#ff5370"
        colorTextButton="#fff"
        colorButtonBackground="#ff5370"
      />
      {words.length === 0 ? <LevelDifficult setLevel={setLevel} color="#ff5370" /> : null}
    </Grid>
  );

  return (
    <div className="sprint-wrap" style={{ backgroundImage: `url(https://i.imgur.com/7591jq9.jpg)` }}>
      <ButtonFullScreen
        color="invert(33%) sepia(38%) saturate(2821%) hue-rotate(327deg) brightness(117%) contrast(95%)"
        fullScreenHandler={fullScreenHandler}
      />
      <div className="sprint-inner">
        <SwitchTransition>
          <CSSTransition in={true} key={gameState} timeout={500} classNames="zoom">
            {gameState === 'loading' ? (
              <Loading />
            ) : gameState === 'start' ? (
              startComponent
            ) : gameState === 'end' ? (
              resultComponent
            ) : (
              gameComponent
            )}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
};

export default Sprint;
