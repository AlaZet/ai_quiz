import React, { useState, useEffect } from "react";
import {
  handleAnswerClick,
  handleCheckAnswer,
  handleNextQuestion,
  handleSumUp,
} from "./components/QuizHelpers";

import questions from "./questions_test.json";
import Button from "./components/Button";
import "./styles/QuizContainer.css";
import "./styles/App.css";

function App() {
  const [quizQuestions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answersChecked, setAnswersChecked] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [lastQuestion, setLastQuestion] = useState(false);

  useEffect(() => {
    setQuestions(questions);
  }, []);

  const handleRestartQuiz = () => {
    console.log("Quiz restarted!");
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setAnswersChecked(false);
    setScore(0);
    setShowScore(false);
    setQuizCompleted(false);
  };

  const showScoreAndQuestionNo = () => (
    <div className="score">
      Score: {score}/{quizQuestions.length}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Question: {currentQuestion + 1}/
      {quizQuestions.length}
    </div>
  );

  //Renders the active quiz with the current question and answer options.
  const handleActiveQuiz = () => (
    <div className="quiz-container">
      <div className="question-container">
        <div className="question">
          {quizQuestions[currentQuestion]?.questionText}
        </div>
        <ul className="answer-list">
          {quizQuestions[currentQuestion]?.answerOptions.map(
            (answerOption, index) => (
              <li className="answer-list-item" key={index}>
                <label
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
                    handleSumUp(
                      score,
                      quizQuestions,
                      handleRestartQuiz,
                      setQuizCompleted
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
          <Button
            buttonClass="button-check-answer"
            onClick={() =>
              handleCheckAnswer(
                currentQuestion,
                quizQuestions,
                selectedAnswers,
                answersChecked,
                setAnswersChecked,
                score,
                setScore,
                setLastQuestion
              )
            }
          />
        )}
      </div>
      {showScoreAndQuestionNo()}
    </div>
  );

  return (
    <div className="quiz-container">
      <div className="header">Certified Tester AI Testing (CT-AI)</div>
      <div className="quiz-title">QUIZ</div>
      {quizCompleted
        ? handleSumUp(score, quizQuestions, handleRestartQuiz)
        : handleActiveQuiz()}
    </div>
  );
}

export default App;
