import React, { useState } from 'react';
import './App.css';

function App() {
  const questions = [
    {
      questionText: 'Jakie jest pytanie?',
      answerOptions: [
        { answerText: 'Odpowiedź 1', isCorrect: false },
        { answerText: 'Odpowiedź 2', isCorrect: false },
        { answerText: 'Odpowiedź 3', isCorrect: false },
        { answerText: 'Odpowiedź 4', isCorrect: false },
      ],
    },
  ];

  const currentQuestion = 0; // Możesz zmieniać numer pytania w zależności od tego, które pytanie chcesz wyświetlić

  const handleAnswerClick = (index) => {
    // Tworzymy kopię tablicy selectedAnswers
    const updatedSelectedAnswers = [...selectedAnswers];
  
    // Sprawdzamy, czy odpowiedź jest już zaznaczona
    if (updatedSelectedAnswers.includes(index)) {
      // Jeśli jest zaznaczona, usuwamy ją ze stanu
      updatedSelectedAnswers.splice(updatedSelectedAnswers.indexOf(index), 1);
    } else {
      // Jeśli nie jest zaznaczona, dodajemy ją do stanu
      updatedSelectedAnswers.push(index);
    }
  
    // Aktualizujemy stan selectedAnswers
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const [selectedAnswers, setSelectedAnswers] = useState([]);


  return (
    <div className="quiz-container">
      <div className="header">Certified Tester AI Testing (CT-AI)</div>
      <div className="quiz-title"style={{ marginBottom: '60px' }}>QUIZ</div>
      <div className="question-container">
        <div className="question" style={{ marginTop: '20px', marginBottom: '40px' }}>Pytanie: {questions[currentQuestion].questionText}</div>

        <ul className="answer-list">
        {questions[currentQuestion].answerOptions.map((answerOption, index) => (
          <li className="answer-list-item" key={index}>
            <label
              className={`answer-label ${selectedAnswers.includes(index) ? "selected" : ""}`}
              onClick={() => handleAnswerClick(index)}
            >
              <input
                type="checkbox"
                name={`answer${index}`}
                checked={selectedAnswers.includes(index)}
                onChange={() => { }} // Wyłącz zmiany na checkboxie
              />
              <div
                className={`answer-rectangle ${selectedAnswers.includes(index) ? "selected" : ""}`}
                onClick={() => handleAnswerClick(index)}
              >
                {answerOption.answerText}
              </div>
            </label>
          </li>
        ))}
      </ul>

        </div>
    </div>
  );
}

export default App;
