import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./styles/EditQuestions.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const EditQuestions = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctOption: 0,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/questions/${id}`)
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate question text
    if (!question.questionText.trim()) {
      toast.error("Question text is required");
      return;
    }

    // Validate options
    const trimmedOptions = question.options.map((option) => option.trim());
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
    if (
      question.correctOption < 0 ||
      question.correctOption >= trimmedOptions.length
    ) {
      toast.error("Invalid correct option");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/questions/update/${id}`, question);
      navigate("/all");
    } catch (error) {
      console.error(error);
      alert("Failed to update question");
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "options") {
      const updatedOptions = [...question.options];
      updatedOptions[index] = value;
      setQuestion({ ...question, options: updatedOptions });
    } else {
      setQuestion({ ...question, [name]: value });
    }
  };

  return (
    <div style={{margin:"6rem"}}>
    <div id="formContainer">
      <h1>Edit Questions</h1>
      <form id="questionForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Question Text:</label>
          <input
            type="text"
            name="questionText"
            value={question.questionText}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label>Options:</label>
          {question.options.map((option, index) => (
            <input
              key={index}
              type="text"
              name="options"
              value={option}
              onChange={(e) => handleChange(e, index)}
              required
            />
          ))}
        </div>
        <div className="form-group">
          <label>Correct Option:</label>
          <select
            name="correctOption"
            value={question.correctOption}
            onChange={(e) => handleChange(e)}
          >
            {question.options.map((option, index) => (
              <option key={index} value={index}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Update Question</button>
      </form>
    </div>
    </div>
  );
};

export default EditQuestions;
