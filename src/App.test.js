import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';


test('renders the quiz question', () => {
  render(<App />);
  const questionElement = screen.getByText("Which of the following statements");
  expect(questionElement).toBeInTheDocument();
});

test('selects an answer option', () => {
  render(<App />);
  const answerOption = screen.getByText(/example answer/i);
  fireEvent.click(answerOption);
  expect(answerOption).toHaveClass('selected');
});

test('checks the answer', () => {
  render(<App />);
  const checkAnswerButton = screen.getByText(/Check answer/i);
  fireEvent.click(checkAnswerButton);
  const correctAnswerElement = screen.getByText(/Correct answer/i);
  expect(correctAnswerElement).toBeInTheDocument();
});

test('goes to the next question', () => {
  render(<App />);
  const nextQuestionButton = screen.getByText(/Next Question/i);
  fireEvent.click(nextQuestionButton);
  const newQuestionElement = screen.getByText(/New question text/i);
  expect(newQuestionElement).toBeInTheDocument();
});

