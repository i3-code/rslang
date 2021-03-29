import { useState } from 'react';

import StartGameMenu from '../components/StartGameMenu/StartGameMenu';
import ResultGame from '../components/ResultGame/ResultGame';
import SprintGame from './SprintGame';

const Sprint = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [answersResults, setAnswersResults] = useState({ right: [], wrong: [] });
  const [result, setResult] = useState(null);

  const resultComponent = (
    <ResultGame
      rightAnswers={answersResults.right}
      wrongAnswers={answersResults.wrong}
      restartGame={() => setGameEnded(false)}
      result={result}
    />
  );
  const gameComponent = (
    <SprintGame
      onGameEnd={setGameEnded}
      gameEnded={gameEnded}
      setResult={setResult}
      setAnswersResults={setAnswersResults}
    />
  );
  const startComponent = (
    <StartGameMenu
      title="Спринт"
      note="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores officiis libero eaque illum! Illo, fugit cumque praesentium ut unde voluptates nobis optio, aspernatur, tempora deserunt eaque inventore tenetur magnam debitis?"
      startGame={() => setGameStarted(true)}
      colorText="#ff5370"
      colorTextButton="#fff"
      colorButtonBackground="#ff5370"
    />
  );
  return gameEnded ? resultComponent : gameStarted ? gameComponent : startComponent;
};

export default Sprint;
