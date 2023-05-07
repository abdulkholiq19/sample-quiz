
import React from 'react';
import "../App.css";

const Result = ({ score, playAgain }) => (
  <div className="container" style={{ 
        display: 'flex',
        justifyContent: 'center', flexDirection: 'column'}}>
      <div className="score" style={{ textAlign: 'center'}}> Your score is {score} / 10 correct answer ! ! ! </div>
      <button
        style={{
          cursor: 'pointer',
          padding: '2vh 4vh',
          marginTop: '24px',
          borderRadius: '1vh'
        }}
        onClick={playAgain}
        > Play Again </button>
    </div>
)

export default Result;