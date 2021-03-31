import rightAnswerSound from '../../../../sounds/rightAnswer.mp3';
import wrongAnswerSound from '../../../../sounds/wrongAnswer.mp3';

export const playAnswerSound = (result) => {
  result ? new Audio(rightAnswerSound).play() : new Audio(wrongAnswerSound).play();
};
