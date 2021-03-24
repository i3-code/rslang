import './SavannahQuiz.css'

const SavannahQuiz = ({quiz, questionNumber, setAnswer}) => {
  return (
    <div className="wrapper-savannah-game">
      <div id="savannah-game-question" className="savannah-game-question active">{quiz[questionNumber].question}</div>
      {quiz[questionNumber].answers.map((answer, index) => (
        <div className="savannah-game-answer" key={index} onClick={() => setAnswer(answer, questionNumber)}>{index + 1}. {answer}</div>
      ))}
    </div>
  )
}

export default SavannahQuiz
