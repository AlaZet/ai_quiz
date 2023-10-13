import React, { useState, useEffect } from "react";
import {
  handleAnswerClick,
  handleCheckAnswer,
  handleNextQuestion,
  handleSumUp,
} from "./components/QuizHelpers";
import Button from "./components/Button.js";

import questions from "./questions.json";
import "./styles/Button.css";
import "./styles/QuizContainer.css";
import "./styles/App.css";

function App() {
  const [quizQuestions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answersChecked, setAnswersChecked] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [lastQuestion, setLastQuestion] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    setQuestions(questions);
  }, []);

  const handleRestartQuiz = () => {
    console.log("Quiz restarted!");
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setAnswersChecked(false);
    setScore(0);
    setQuizCompleted(false);
    setShowSummary(false);
    setLastQuestion(false);
    handleActiveQuiz();
  };

  const showScoreAndQuestionNo = () => (
    <div className="score">
      Score: {score}/{quizQuestions.length}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Question: {currentQuestion + 1}/
      {quizQuestions.length}
    </div>
  );

  const handleFinishQuiz = () => {
    console.log("Last question!");
    setLastQuestion(true);
    setShowSummary(true);
  };

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
        {!answersChecked && !lastQuestion && !quizCompleted && (
          <Button
            buttonClass="button-check-answer"
            text="Check Answer"
            onClick={() =>
              handleCheckAnswer(
                currentQuestion,
                quizQuestions,
                selectedAnswers,
                answersChecked,
                setAnswersChecked,
                score,
                setScore,
                () => {
                  setLastQuestion(true);
                }
              )
            }
          />
        )}

        {lastQuestion && !quizCompleted && (
          <Button
            buttonClass="button-finish-quiz"
            text="Finish Quiz"
            onClick={() =>
              handleFinishQuiz(
                currentQuestion,
                setCurrentQuestion,
                setSelectedAnswers,
                setAnswersChecked,
                quizQuestions,
                setQuizCompleted
              )
            }
          />
        )}

        {answersChecked && !lastQuestion && (
          <Button
            buttonClass="button-next-question"
            text="Next Question"
            onClick={() =>
              handleNextQuestion(
                currentQuestion,
                setCurrentQuestion,
                setSelectedAnswers,
                setAnswersChecked,
                quizQuestions
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
      {showSummary
        ? handleSumUp(score, quizQuestions, handleRestartQuiz)
        : handleActiveQuiz()}
    </div>
  );
}

export default App;
