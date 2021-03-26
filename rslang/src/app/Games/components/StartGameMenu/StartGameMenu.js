import styles from './StartGameMenu.module.css';
import React from 'react';

const StartGameMenu = ({ title, note, startGame, colorText, colorTextButton, colorButtonBackground }) => {
  return (
    <div className={styles.startMenuWrapper}>
      <div className={styles.title} style={{ color: colorText }}>
        {title}
      </div>
      <div className={styles.note} style={{ color: colorText }}>
        {note}
      </div>
      <button
        className={styles.startButton}
        onClick={() => startGame()}
        style={{ color: colorTextButton, backgroundColor: colorButtonBackground }}
      >
        Начать
      </button>
    </div>
  );
};

export default StartGameMenu;
