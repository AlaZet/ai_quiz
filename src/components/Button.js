import React from "react";

function Button({ currentQuestion, totalQuestions, answersChecked, onClick }) {
    let buttonText = "Check Answer";
    let buttonClass = "button-check-answer";
    
    if (answersChecked) {
      if (currentQuestion === totalQuestions - 1) {
        buttonText = "Restart Quiz";
        buttonClass += " button-restart-quiz";
      } else {
        buttonText = "Next Question";
        buttonClass += " button-next-question";
      }
    }
  
    return (
      <button
        className={buttonClass}
        onClick={onClick}
      >
        {buttonText}
      </button>
    );
  }
  

export default Button;
