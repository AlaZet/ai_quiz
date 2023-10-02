import React, { useState, useEffect } from 'react';
import questions from './questions.json';
import './App.css';

function App() {
  const [quizQuestions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]); // Dodaj zmienną selectedAnswers
  const [answersChecked, setAnswersChecked] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  useEffect(() => {
    setQuestions(questions);
  }, []);

  const currentQuestion = 0;

  const handleAnswerClick = (index) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    if (updatedSelectedAnswers.includes(index)) {
      updatedSelectedAnswers.splice(updatedSelectedAnswers.indexOf(index), 1);
    } else {
      updatedSelectedAnswers.push(index);
    }
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const handleCheckAnswer = () => {
    const correctAnswersIndexes = quizQuestions[currentQuestion].answerOptions
      .filter((answerOption) => answerOption.isCorrect)
      .map((answerOption, index) => index);

    setCorrectAnswers(correctAnswersIndexes);
    setAnswersChecked(true);
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
          Question: {quizQuestions[currentQuestion]?.questionText}
        </div>

        <ul className="answer-list">
          {quizQuestions[currentQuestion]?.answerOptions.map(
            (answerOption, index) => (
              <li className="answer-list-item" key={index}>
                <label
                  className={`answer-label ${
                    selectedAnswers.includes(index) ? 'selected' : ''
                  }`}
                  onClick={() => handleAnswerClick(index)}
                >
                  <div
                    className={`answer-rectangle ${
                      selectedAnswers.includes(index) ? 'selected' : ''
                    } ${
                      answersChecked &&
                      (correctAnswers.includes(index)
                        ? 'correct'
                        : !correctAnswers.includes(index)
                        ? 'incorrect'
                        : '')
                    }`}
                  >
                    {answerOption.answerText}
                  </div>
                </label>
              </li>
            )
          )}
        </ul>
        <div
          className="button-check-answer"
          style={{ marginTop: '40px' }}
          onClick={handleCheckAnswer}
        >
          Check answer
        </div>
      </div>
    </div>
  );
}

export default App;
