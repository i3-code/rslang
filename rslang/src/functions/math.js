export function randomFromArray(arr) {

  return arr[Math.floor((Math.random() * arr.length))];
}

export function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function calculatePercentResult(good, length) {
  let result = good / length
  const parsed = parseInt(result * 100);
  if (isNaN(parsed)) { return 0; }

  return parsed;
}

export function getRandomAnswers(rightAnswer, answerVariations) {
  const answers = [rightAnswer]
  while (answers.length !== 4) {
    let randomAnswer = randomFromArray(answerVariations)
    if(answers.indexOf(randomAnswer) === -1) {
      answers.push(randomAnswer)
    }
  }

  return shuffle(answers)
}
