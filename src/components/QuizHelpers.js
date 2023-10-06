export const handleAnswerClick = (
  index,
  answersChecked,
  selectedAnswers,
  setSelectedAnswers
) => {
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


export const handleCheckAnswer = (
  currentQuestion,
  quizQuestions,
  selectedAnswers,
  answersChecked,
  setAnswersChecked,
  score,
  setScore,
  setQuizCompleted
) => {
  if (answersChecked) {
    return;
  }

  const currentQuestionData = quizQuestions[currentQuestion];
  const correctAnswerIndex = currentQuestionData.answerOptions.findIndex(
    (answerOption) => answerOption.isCorrect
  );

  const isCorrect =
    selectedAnswers.length === 1 && selectedAnswers[0] === correctAnswerIndex;

  setAnswersChecked(true);

  if (isCorrect) {
    setScore(score + 1);
  }

  if (currentQuestion === quizQuestions.length - 1) {
    setQuizCompleted(true);
  }
};


export const handleNextQuestion = (
  currentQuestion,
  setCurrentQuestion,
  setSelectedAnswers,
  setAnswersChecked,
  quizQuestions,
  setShowScore
) => {
  setCurrentQuestion(currentQuestion + 1);
  setSelectedAnswers([]);
  setAnswersChecked(false);

  if (currentQuestion === quizQuestions.length - 1) {
    setShowScore(true);
  }
};


export const handleSumUp = (score, quizQuestions, handleRestartQuiz) => {
  return (
    <div className="sum-up">
      <div className="sum-up-text">
        Thanks for taking part in the quiz!
        <br />
        Your score is: {score}/{quizQuestions.length}
      </div>
      <button className="try-again-button" onClick={handleRestartQuiz}>
        Try again!
      </button>
    </div>
  );
};

