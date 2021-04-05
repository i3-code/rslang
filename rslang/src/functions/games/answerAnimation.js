export const setAnswerAnimation = (selector, index, nameClass, duration = 2000, autoClear = true) => {
  let divElement = document.querySelectorAll(`.${selector}`)[index];
  divElement.classList.add(nameClass);
  if (autoClear) {
    setTimeout(() => {
      divElement.classList.remove(nameClass);
    }, duration);
  }
};

export const clearAnswerAnimation = (selector, nameClass) => {
  let divElements = document.querySelectorAll(`.${selector}`);
  divElements.forEach((divElement) => {
    divElement.classList.remove(nameClass);
  });
};
