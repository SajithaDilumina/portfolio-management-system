import React, { useEffect, useState } from "react";
import "./styles/Question.css";
import axios from "axios";
import Timer from "./Timer";
import QuestionSkeloton from "./QuestionSkeloton";
import checkAnswer from "./CheckAnswer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Question() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/questions/quiz");
        setQuestions(res.data);
        setSelectedOptions({});
      } catch (error) {
        console.error("Error fetching questions", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    console.log("Correct answers:", correctAnswerCount);
  }, [correctAnswerCount]);

  const handleNextButtonClick = () => {
    if (selectedOptions[currentQuestionIndex] === undefined) {
      toast.error("Please answer the question!");
      return;
    }

    checkAnswer(
      selectedOptions,
      currentQuestionIndex,
      questions,
      correctAnswers,
      setCorrectAnswerCount,
      setCorrectAnswers
    );

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    if (currentQuestionIndex === questions.length - 1) {
      const endTime = Date.now();
      const timeTaken = endTime - startTime;
      const correctAnswersCount = correctAnswerCount;
      const userString = localStorage.getItem('user');
      const user = JSON.parse(userString);
      const userId = user._id;
      axios
        .post("http://localhost:5000/results", {
          correctAnswers: correctAnswersCount,
          milliseconds: timeTaken,
          userId: userId,

        })
        .then((response) => {
          console.log("Marks and time saved successfully");

          // Redirect to the score page
          window.location.href = `/intro?correct=${correctAnswersCount}&time=${timeTaken}`;
        })
        .catch((error) => {
          console.error("Error saving marks and time:", error);
        });
    }

    if (startTime === null && currentQuestionIndex === 0) {
      setStartTime(Date.now());
    }
  };

  const handlePreviousButtonClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleOptionChange = (value) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [currentQuestionIndex]: parseInt(value),
    }));
  };

  return (
    <div className="question-container">
      <div className="timer">
        {startTime !== null && <Timer startTime={startTime} />}
      </div>

      <div className="question">
        {isLoading ? (
          <QuestionSkeloton />
        ) : (
          questions.length > 0 &&
          currentQuestionIndex < questions.length && (
            <div key={currentQuestionIndex}>
              <p>{questions[currentQuestionIndex].questionText}</p>
              <div className="options row">
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <div className="option col-md-6" key={index}>
                      <input
                        type="radio"
                        id={`option${index}`}
                        name="answer"
                        value={index}
                        checked={
                          selectedOptions[currentQuestionIndex] === index
                        }
                        onChange={() => handleOptionChange(index)}
                      />
                      <label htmlFor={`option${index}`}>{option}</label>
                    </div>
                  )
                )}
              </div>
            </div>
          )
        )}
      </div>
      <div className="text-center">
        <div className="previous">
          {currentQuestionIndex > 0 ? (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handlePreviousButtonClick}
            >
              Previous
            </button>
          ) : (
            <p></p>
          )}
        </div>
        <h6>{`${currentQuestionIndex + 1} of ${
          questions.length
        } questions`}</h6>
        {currentQuestionIndex < questions.length ? (
          <button
            type="button"
            className="next"
            id="next-btn"
            onClick={handleNextButtonClick}
          >
            Next
          </button>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
