import React, { useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import StartGameMenu from '../components/StartGameMenu/StartGameMenu';
import ResultGame from '../components/ResultGame/ResultGame';
import SprintGame from './SprintGame';
import './styles.css';

const Sprint = () => {
  const [gameState, setGameState] = useState('start');
  const [answersResults, setAnswersResults] = useState({ right: [], wrong: [] });
  const [result, setResult] = useState(null);

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
      setGameState = {setGameState}
      gameState={gameState}
      setResult={setResult}
      setAnswersResults={setAnswersResults}
    />
  );
  const startComponent = (
    <StartGameMenu
      title="Спринт"
      note="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores officiis libero eaque illum! Illo, fugit cumque praesentium ut unde voluptates nobis optio, aspernatur, tempora deserunt eaque inventore tenetur magnam debitis?"
      startGame={() => setGameState('game')}
      colorText="#ff5370"
      colorTextButton="#fff"
      colorButtonBackground="#ff5370"
    />
  );
  return (
    <SwitchTransition>
      <CSSTransition in={gameState} key={gameState} timeout={500} classNames="zoom">
        {gameState === 'start' ? startComponent : gameState === 'end' ? resultComponent : gameComponent}
      </CSSTransition>
    </SwitchTransition>
  );
};

export default Sprint;
