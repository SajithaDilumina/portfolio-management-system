import React from "react";
import { Link } from "react-router-dom";
import "./styles/QuizIntroduction.css";

export default function QuizIntroduction() {
  return (
    <div className="quiz-container">
      <h1>Welcome to the Quiz!</h1>
      <p>
        <b>
          Are you ready to test your knowledge? Here are the rules for the quiz:
        </b>
      </p>
      <ol>
        <li id="instruction">There are 10 questions in total.</li>
        <li id="instruction">
          A timer will start after answering the first question.
        </li>
        <li id="instruction">
          You'll have a limited time to answer each question.
        </li>
        <li id="instruction">Each correct answer earns you points.</li>
        <li id="instruction">At the end of the quiz, you'll see your score.</li>
      </ol>
      <Link to={"/quiz"}>
        <button className="start-button">Start Quiz</button>
      </Link>
    </div>
  );
}
