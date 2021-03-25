import './ResultGame.css';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { restartGame, selectResult } from '../savannahSlice';

const ResultGame = ({ result }) => {
  const dispatch = useDispatch();

  return (
    <div className="wrapper-result-game">
      <div className="result-game-percent">
        <div>Ваш результат {useSelector(selectResult)}%</div>
      </div>
      <div className="button-continue" onClick={() => dispatch(restartGame())}>
        Продолжить тренеровку
      </div>
      <NavLink className="button-back" to="/games">
        К списку тренеровок
      </NavLink>
    </div>
  );
};

export default ResultGame;
