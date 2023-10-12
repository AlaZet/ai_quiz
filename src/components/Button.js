import React from "react";
import "../styles/CtaButton.css";

function Button({
  currentQuestion,
  totalQuestions,
  answersChecked,
  quizCompleted,
  onClick,
}) {
  let buttonText = "Check Answer";
  let buttonClass = "button-check-answer";

  if (answersChecked) {
    if (currentQuestion === totalQuestions - 1) {
      buttonText = "Finish Quiz!";
      buttonClass += " button-finish-quiz";
    } else {
      buttonText = "Next Question";
      buttonClass += " button-next-question";
    }
  }
  if (quizCompleted) {
    buttonText = "Try Again";
    buttonClass = "button-try-again";
  }

  return (
    <button className={buttonClass} onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default Button;
