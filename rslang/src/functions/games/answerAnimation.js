export const setAnswerAnimation = (selector, index, nameClass, duration = 2000) => {
  let divElement = document.querySelectorAll(`.${selector}`)[index];
  divElement.classList.add(nameClass);
  setTimeout(() => {
    divElement.classList.remove(nameClass);
  }, duration);
};
