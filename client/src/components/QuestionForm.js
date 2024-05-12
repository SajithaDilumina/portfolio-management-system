import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/QuestionForm.css";

const QuestionForm = () => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate question text
    if (!questionText.trim()) {
      toast.error("Question text is required");
      return;
    }

    // Validate options
    const trimmedOptions = options.map((option) => option.trim());
    if (trimmedOptions.some((option) => !option)) {
      toast.error("All options are required");
      return;
    }
    if (new Set(trimmedOptions).size !== trimmedOptions.length) {
      toast.error("Options must be unique");
      return;
    }
    if (trimmedOptions.length < 4) {
      toast.error("All four options are required");
      return;
    }
    if (
      trimmedOptions.some((option) => option.length < 2 || option.length > 80)
    ) {
      toast.error("Option text must be between 2 and 80 characters");
      return;
    }

    // Validate correct option
    if (correctOption < 0 || correctOption >= trimmedOptions.length) {
      toast.error("Invalid correct option");
      return;
    }

    // If all validations pass, submit the form
    try {
      await axios.post("http://localhost:5000/questions/add", {
        questionText,
        options: trimmedOptions,
        correctOption,
      });

      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectOption(0);

      toast.success("Question added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit question");
    }
  };

  return (
    <div style={{marginTop:"7rem"}}>
    <div id="formContainer">
      <h1>Add Questions</h1>
      <form id="questionForm" onSubmit={handleSubmit}>
        <label htmlFor="questionText">Question:</label>
        <input
          type="text"
          id="questionText"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          required
        />

        <label htmlFor="options">Options:</label>
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) =>
              setOptions([
                ...options.slice(0, index),
                e.target.value,
                ...options.slice(index + 1),
              ])
            }
            required
          />
        ))}

        <label htmlFor="correctOption">Correct Option:</label>
        <select
          value={correctOption}
          onChange={(e) => setCorrectOption(parseInt(e.target.value))}
        >
          {options.map((option, index) => (
            <option key={index} value={index}>
              {option}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default QuestionForm;
