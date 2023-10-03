import React, { useState, useEffect } from 'react';
import questions from './questions.json';
import './App.css';

function App() {
  const [quizQuestions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answersChecked, setAnswersChecked] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
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
  
    const correctAnswersIndexes = quizQuestions[currentQuestion].answerOptions
      .filter((answerOption) => answerOption.isCorrect)
      .map((answerOption, index) => index);
  
    const isCorrect = selectedAnswers.every((index) =>
      correctAnswersIndexes.includes(index)
    );
  
    setCorrectAnswers(correctAnswersIndexes);
    setAnswersChecked(true);
  
    if (isCorrect) {
      // Jeśli odpowiedź jest poprawna, dodaj punkt do wyniku
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswers([]);
    setAnswersChecked(false);
  };

  return (
    <div className="quiz-container">
      <div className="header">Certified Tester AI Testing (CT-AI)</div>
      <div className="quiz-title" style={{ marginBottom: '60px' }}>
        QUIZ
      </div>
      <div className="question-container">
        <div
          className="question"
          style={{ marginTop: '20px', marginBottom: '40px' }}
        >
          {quizQuestions[currentQuestion]?.questionText}
        </div>

        <ul className="answer-list">
          {quizQuestions[currentQuestion]?.answerOptions.map(
            (answerOption, index) => (
              <li className="answer-list-item" key={index}>
                <label
                  className={`answer-label ${
                    selectedAnswers.includes(index) ? 'selected' : ''
                  } ${answersChecked && correctAnswers.includes(index) ? 'correct' : answersChecked && !correctAnswers.includes(index) ? 'incorrect' : ''}`}
                  onClick={() => handleAnswerClick(index)}
                >
                  <div
                    className={`answer-rectangle ${
                      selectedAnswers.includes(index) ? 'selected' : ''
                    } ${answersChecked && correctAnswers.includes(index) ? 'correct' : answersChecked && !correctAnswers.includes(index) ? 'incorrect' : ''}`}
                  >
                    {answerOption.answerText}
                  </div>
                </label>
              </li>
            )
          )}
        </ul>
        {answersChecked ? (
          <div
            className="button-check-answer"
            style={{ marginTop: '40px' }}
            onClick={
              currentQuestion === quizQuestions.length - 1
                ? () => setCurrentQuestion(0)
                : handleNextQuestion
            }
          >
            {currentQuestion === quizQuestions.length - 1
              ? 'Restart Quiz'
              : 'Next Question'}
          </div>
        ) : (
          <div
            className="button-check-answer"
            style={{ marginTop: '40px' }}
            onClick={handleCheckAnswer}
          >
            Check Answer
          </div>
        )}
      </div>
      <div
        className="score"
      >
        Score: {score}/{quizQuestions.length}
      </div>
    </div>
  );
}

export default App;
