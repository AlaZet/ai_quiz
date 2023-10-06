import React, { useState, useEffect } from "react";
import {
  handleAnswerClick,
  handleCheckAnswer,
  handleNextQuestion,
  handleSumUp,
} from "./components/QuizHelpers";

import questions from "./questions.json";
import Button from "./components/Button";
import "./styles/QuizContainer.css";
import "./styles/CtaButton.css";
import "./styles/App.css";

function App() {
  const [quizQuestions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answersChecked, setAnswersChecked] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    setQuestions(questions);
  }, []);

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setAnswersChecked(false);
    setScore(0);
    setShowScore(false);
    setQuizCompleted(false);
  };

  const handleActiveQuiz = () => (
    <div className="question-container">
      <div className="question">
        {quizQuestions[currentQuestion]?.questionText}
      </div>
      <ul className="answer-list">
        {quizQuestions[currentQuestion]?.answerOptions.map(
          (answerOption, index) => (
            <li className="answer-list-item" key={index}>
              <label
                className={`answer-label ${
                  selectedAnswers.includes(index) ? "selected" : ""
                } ${
                  answersChecked && answerOption.isCorrect
                    ? "correct"
                    : answersChecked && !answerOption.isCorrect
                    ? "incorrect"
                    : ""
                }`}
                onClick={() =>
                  handleAnswerClick(
                    index,
                    answersChecked,
                    selectedAnswers,
                    setSelectedAnswers
                  )
                }
              >
                <div
                  className={`answer-container ${
                    selectedAnswers.includes(index) ? "selected" : ""
                  } ${
                    answersChecked && answerOption.isCorrect
                      ? "correct"
                      : answersChecked && !answerOption.isCorrect
                      ? "incorrect"
                      : ""
                  }`}
                >
                  {answerOption.answerText}
                </div>
              </label>
            </li>
          )
        )}
      </ul>
      {answersChecked ? (
        <Button
          currentQuestion={currentQuestion}
          totalQuestions={quizQuestions.length}
          answersChecked={answersChecked}
          onClick={
            currentQuestion === quizQuestions.length - 1
              ? () =>
                  handleRestartQuiz(
                    setCurrentQuestion,
                    setSelectedAnswers,
                    setAnswersChecked,
                    setScore,
                    setShowScore,
                    handleActiveQuiz
                  )
              : () =>
                  handleNextQuestion(
                    currentQuestion,
                    setCurrentQuestion,
                    setSelectedAnswers,
                    setAnswersChecked,
                    quizQuestions,
                    setShowScore
                  )
          }
        />
      ) : (
        <div
          className="button-check-answer"
          onClick={() =>
            handleCheckAnswer(
              currentQuestion,
              quizQuestions,
              selectedAnswers,
              answersChecked,
              setAnswersChecked,
              score,
              setScore,
              setQuizCompleted
            )
          }
        >
          Check Answer
        </div>
      )}
      <div className="score">
        Score: {score}/{quizQuestions.length}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Question: {currentQuestion + 1}/{quizQuestions.length}
      </div>
    </div>
  );

  return (
    <div className="quiz-container">
      <div className="header">Certified Tester AI Testing (CT-AI)</div>
      <div className="quiz-title">QUIZ</div>
      {quizCompleted ? handleSumUp(
        score,
        quizQuestions,
        handleRestartQuiz) 
        : handleActiveQuiz()}
    </div>
  );
}

export default App;
