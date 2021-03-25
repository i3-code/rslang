import './StartGameMenu.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { startGame } from '../savannahSlice';

const StartGameMenu = () => {
  const dispatch = useDispatch();

  return (
    <div className="start-menu-wrapper">
      <div className="title">Саванна</div>
      <div className="note">
        Тренировка Саванна развивает словарный запас. Чем больше слов ты знаешь, тем больше очков опыта получишь.
      </div>
      <button className="start-button" onClick={() => dispatch(startGame())}>
        Начать
      </button>
    </div>
  );
};

export default StartGameMenu;
