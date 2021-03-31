export const checkContainAnswerArray = (array, question) => {
  return array.map((el) => el.question).indexOf(question) === -1;
};
