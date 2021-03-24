import './Savannah.css'
import {useEffect, useState} from 'react'
import axios from 'axios'
import SavannahQuiz from './SavannahQuiz/SavannahQuiz'
import {calculatePercentResult, randomFromArray, shuffle} from '../../../functions/math'
import Loading from '../../../components/partials/Loading'
import ResultGame from './ResultGame/ResultGame'

const Savannah = () => {
  const TIMER_LIMIT = 7
  const [start, setStart] = useState(false)
  const [finished, setFinished] = useState(false)
  const [timer, setTimer] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [quiz, setQuiz] = useState([])
  const [result, setResult] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const fetchedData = await axios.get('https://react-rslang.herokuapp.com/words');
        const words = fetchedData.data;
        const answerVariations = words.map(word => word.wordTranslate)
        shuffle(words)
        const quizWords = words.slice(0, 5)
        const quizPrepare = []
        quizWords.forEach((word, index) => {
          quizPrepare.push({
            id: index + 1,
            question: word.word,
            answers: getRandomAnswers(word.wordTranslate, answerVariations),
            rightAnswer: word.wordTranslate,
            status: false
          })
        })
        setQuiz(quizPrepare)
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [result])

  useEffect(() => {
    if (start) {
      const intervalIdTimer = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)

      return () => {
        clearInterval(intervalIdTimer)
      }
    }
  }, [start])

  useEffect(() => {
    if (timer > TIMER_LIMIT) {
      nextRound()
    }
  }, [timer])

  function nextRound() {
    if (questionNumber >= quiz.length - 1) {
      setStart(false)
      setResult(calculateResult())
      setFinished(true)
      return
    }
    setTimer(0)
    document.getElementById('savannah-game-question').classList.remove('active')
    setQuestionNumber(questionNum => questionNum + 1)
    setTimeout(function () {
      document.getElementById('savannah-game-question').classList.add('active')
    }, 50);
  }

  function setAnswer(answer, number) {
    if (quiz[number].rightAnswer === answer) {
      const newQuiz = [...quiz]
      newQuiz[number].status = true
      setQuiz(() => newQuiz)
    }
    nextRound()
  }

  function calculateResult() {
    let good = quiz.filter(q => q.status)
    return calculatePercentResult(good.length, quiz.length)
  }

  function getRandomAnswers(rightAnswer, answerVariations) {
    return shuffle([rightAnswer, randomFromArray(answerVariations), randomFromArray(answerVariations), randomFromArray(answerVariations)])
  }

  const restartGame = () => {
    setTimer(0)
    setQuestionNumber(0)
    setFinished(false)
    setStart(true)
  }

  return (
    <div className="savannah-background"
         style={{backgroundImage: `url(https://searchthisweb.com/wallpaper/african-savanna_2880x1800_y526q.jpg)`}}>
      <div className="savannah-wrapper">
        <div className="savannah">
          {loading === true
            ?
            <Loading/>
            :
            !start
              ?
                finished
                  ?
                  <ResultGame result={result} restartGame={restartGame}/>
                  :
                  <div className="start-menu-wrapper">
                    <div className="title">Саванна</div>
                    <div className="note">Тренировка Саванна развивает словарный запас. Чем больше слов ты знаешь, тем
                      больше
                      очков опыта получишь.
                    </div>
                    <button className="start-button" onClick={() => setStart(true)}>Начать</button>
                  </div>
              :
              <SavannahQuiz
                quiz={quiz}
                questionNumber={questionNumber}
                setAnswer={setAnswer}
              />
          }
        </div>
      </div>
    </div>
  )
}

export default Savannah
