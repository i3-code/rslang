import styles from './ButtonFullScreen.module.css';
import React from 'react';

const ButtonFullScreen = ({ color, fullScreenHandler }) => {
  let fullScreenActive = fullScreenHandler.active;
  const imgSrc = !fullScreenActive ? './images/games/full_screen1.png' : './images/games/full_screen2.png';
  return (
    <button
      className={styles.button}
      onClick={() => (!fullScreenActive ? fullScreenHandler.enter() : fullScreenHandler.exit())}
    >
      <img
        style={{
          filter: color,
        }}
        src={imgSrc}
        alt="full_screen"
      />
    </button>
  );
};

export default ButtonFullScreen;
