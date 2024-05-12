const CheckAnswer = (
  selectedOptions,
  currentQuestionIndex,
  questions,
  correctAnswers,
  setCorrectAnswerCount,
  setCorrectAnswers
) => {
  if (
    selectedOptions[currentQuestionIndex] !== undefined &&
    questions.length > 0 &&
    currentQuestionIndex < questions.length
  ) {
    const selectedOption = selectedOptions[currentQuestionIndex];
    const currentQuestion = questions[currentQuestionIndex];
    const correctOption = currentQuestion.correctOption;

    if (selectedOption === correctOption) {
      if (!correctAnswers[currentQuestionIndex]) {
        setCorrectAnswerCount((prevCount) => prevCount + 1);
        setCorrectAnswers((prevAnswers) => ({
          ...prevAnswers,
          [currentQuestionIndex]: true,
        }));
      }
    } else {
      if (correctAnswers[currentQuestionIndex]) {
        setCorrectAnswerCount((prevCount) => prevCount - 1);
        setCorrectAnswers((prevAnswers) => ({
          ...prevAnswers,
          [currentQuestionIndex]: false,
        }));
      }
    }
  }
};

export default CheckAnswer;
