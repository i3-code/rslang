import './ResultGame.css'
import {NavLink} from 'react-router-dom'
import React from "react";

const ResultGame = ({result, restartGame}) => {
  return (
    <div className="wrapper-result-game">
      <div className="result-game-percent"><div>Ваш результат {result}%</div></div>
      <div className="button-continue" onClick={restartGame}>Продолжить тренеровку</div>
      <NavLink className="button-back" to="/games">К списку тренеровок</NavLink>
    </div>
  )
}

export default ResultGame
