export const setAnswerAnimation = (selector, index, nameClass) => {
  let divElement = document.querySelectorAll(`.${selector}`)[index];
  divElement.classList.add(nameClass);
  setTimeout(() => {
    divElement.classList.remove(nameClass);
  }, 2000);
};
