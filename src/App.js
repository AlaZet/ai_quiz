import React, { useState, useEffect } from "react";
import questions from "./questions.json";
import Button from "./components/Button";
import "./App.css";

function App() {
  const [quizQuestions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answersChecked, setAnswersChecked] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setQuestions(questions);
  }, []);

  const handleAnswerClick = (index) => {
    if (answersChecked) {
      return;
    }

    const updatedSelectedAnswers = [...selectedAnswers];

    if (updatedSelectedAnswers.includes(index)) {
      updatedSelectedAnswers.splice(updatedSelectedAnswers.indexOf(index), 1);
    } else {
      updatedSelectedAnswers.push(index);
    }

    setSelectedAnswers(updatedSelectedAnswers);
  };

  const handleCheckAnswer = () => {
    if (answersChecked) {
      return;
    }
  
    const currentQuestionData = quizQuestions[currentQuestion];
    const correctAnswerIndex = currentQuestionData.answerOptions.findIndex(
      (answerOption) => answerOption.isCorrect
    );
  
    const isCorrect = selectedAnswers.length === 1 && selectedAnswers[0] === correctAnswerIndex;
  
    setAnswersChecked(true);
  
    if (isCorrect) {
      // Jeśli odpowiedź jest poprawna, dodaj punkt
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswers([]);
    setAnswersChecked(false);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setAnswersChecked(false);
    setScore(0);
  };

  return (
    <div className="quiz-container">
      <div className="header">Certified Tester AI Testing (CT-AI)</div>
      <div className="quiz-title">
        QUIZ
      </div>
      <div className="question-container">
        <div
          className="question"
        >
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
                  onClick={() => handleAnswerClick(index)}
                >
                  <div
                    className={`answer-rectangle ${
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
                  ? handleRestartQuiz
                  : handleNextQuestion
              }
            />
          ) : (
            <div
              className="button-check-answer"
              onClick={handleCheckAnswer}
            >
              Check Answer
            </div>
          )}
                </div>
                <div className="score">
                  Score: {score}/{quizQuestions.length}
                </div>
              </div>
            );
          }

export default App;
