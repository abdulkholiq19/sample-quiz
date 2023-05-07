import React from "react";
import "../App.css";

// Function to question inside our app
const QuestionBox = ({question, options, selected, idx}) => {
 
  return (
    <div className="questionBox">
      <div className="question">{question}</div>
      {options.map((text, index) => {
      return(
        <button
          key={index}
          className="answerBtn"
          style={{
            cursor: 'pointer',
            margin: '2vh 1vh',
          }}
          onClick={(e) => {
            e.preventDefault();
            selected(text, idx);
          }}> {text}
        </button>
      )})}
    </div>
  )
};

export default QuestionBox;