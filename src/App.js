import React, { useState, useEffect } from 'react';
import './App.css';
import QuestionBox from './components/QuestionBox';
import ResultBox from './components/ResultBox';

export default function App() {
  const [questionBank, setQuestionBank] = useState([])
  const [score, setScore] = useState(0)
  const [isSubmit, setIsSubmit] = useState(true)

  useEffect(() => {
    getQuestions();
  }, [])

  const getQuestions = async () => {
    const response = await fetch('https://the-trivia-api.com/v2/questions')
    const jsonData = await response.json();
    const arr = []
    for (var i = 0; i < jsonData.length; i++) {
      jsonData[i].incorrectAnswers.push(jsonData[i].correctAnswer);
      const randomAnswer = jsonData[i].incorrectAnswers.slice().sort(() => Math.random() - 0.5);
      var newArray = randomAnswer.filter(function (elem, pos) {
        return randomAnswer.indexOf(elem) === pos;
      });
      arr.push({ ...jsonData[i], answers: newArray });
    }
    setQuestionBank(arr)
  };

  const computeAnswer = (answer, correctAns, idx) => {

    if (answer === correctAns) {
      setScore(score + 1);
    }

    const arr = []
    const selectedAnswer = questionBank[idx].answers.filter((elm) => elm === answer)

      if (selectedAnswer.length !== 0) {
        arr.push({ ...questionBank[idx], answers: selectedAnswer, key: idx });
      } else {
        arr.push({ ...questionBank[idx]});
      }

      const filterQuestion = questionBank.filter((el) => el.id !== questionBank[idx].id )
      arr.push(...filterQuestion)
    
      setQuestionBank(arr.sort((a, b) => a.key - b.key))
  };


  // Set state back to default and call function
  const playAgain = () => {
    setIsSubmit(false)
    getQuestions();
    setScore(0);
  };

  const handleSubmit = () => {
    console.log('masukkk', score)
    setIsSubmit(true)
  }

  const renderButton = questionBank.find((elm) => elm.answers?.length > 1)
  return (
    <>
      <div className="container">
        <div className="title" style={{ fontSize: '8vh', textAlign: 'center', margin: '8px 0px'}}>
          QuizOn
        </div>

        {isSubmit === false && questionBank.length > 0 &&
          questionBank.map((el, idx) => {
            return (
              <>
                <QuestionBox question={el.question.text} options={el.answers} key={el.id}
                  selected={(answer) => 
                    computeAnswer(answer, el.correctAnswer, idx)
                  }
                />
              </>
            )
          })
        }
        {
          isSubmit === true && 
          < ResultBox score={score} playAgain={() => playAgain()} /> 
        }
        {!renderButton && isSubmit === false && (
          <div className="container" style={{ 
                display: 'flex',
                justifyContent: 'center'}}>
            <button
              className="answerBtn"
              style={{
                cursor: 'pointer',
                padding: '2vh 4vh',
                marginTop: '24px',
                borderRadius: '1vh'
              }}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit()
              }}> {'Submit'}
            </button>
        </div>
        )}
      </div>
    </>
  )
}
