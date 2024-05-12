import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles/AllQuestions.css";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import SearchContainer from "./SearchContainer";

export default function AllQuestions() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const questionsPerPage = 4;
  const pagesVisited = pageNumber * questionsPerPage;

  useEffect(() => {
    function getQuestions() {
      axios
        .get("http://localhost:5000/questions")
        .then((res) => {
          setQuestions(res.data);
          setFilteredQuestions(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getQuestions();
  }, []);

  const handleDelete = (id, event) => {
    event.preventDefault();

    const confirmation = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (confirmation) {
      axios
        .delete(`http://localhost:5000/questions/delete/${id}`)
        .then(() => {
          console.log("Question deleted successfully");
          window.location.reload();
        })
        .catch((err) => {
          console.error("Error deleting question:", err);
        });
    } else {
      console.log("Delete action cancelled");
    }
  };

  const handleSearch = (searchText) => {
    const filtered = questions.filter(
      (question) =>
        question.questionText
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        question.options.some((option) =>
          option.toLowerCase().includes(searchText.toLowerCase())
        )
    );
    setFilteredQuestions(filtered);
    setPageNumber(0);
  };

  const displayQuestions = filteredQuestions
    .slice(pagesVisited, pagesVisited + questionsPerPage)
    .map((question, index) => (
      <tr key={index}>
        <td>{question.questionText}</td>
        <td>
          <ol>
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex}>{option}</li>
            ))}
          </ol>
        </td>
        <td id="correctOption" className="col-2">
          {question.correctOption + 1}
        </td>
        <td id="iconCell" className="icon-cell">
          <Link to={`update/${question._id}`}>
            <FontAwesomeIcon className="icon" icon={faPen} />
          </Link>
        </td>
        <td id="iconCell" className="icon-cell">
          <Link
            to={`delete/${question._id}`}
            onClick={(event) => handleDelete(question._id, event)}
          >
            <FontAwesomeIcon className="icon" icon={faTrash} />
          </Link>
        </td>
      </tr>
    ));

  const pageCount = Math.ceil(filteredQuestions.length / questionsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div  className="ml-64 mt-8 px-4">
      <div id="topRightContainer">
        <div id="search">
          <SearchContainer onSearch={handleSearch} />
        </div>
        <Link to="/qualificationManager/add">
          <button id="addQuestions">
            <FontAwesomeIcon icon={faPlus} className="plus" />
            Add Questions
          </button>
        </Link>
      </div>

      <div id="tableResponsive">
        <table id="questionsTable">
          <thead id="tableHead">
            <tr>
              <th>Question</th>
              <th>Options</th>
              <th>Correct Option</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{displayQuestions}</tbody>
        </table>
      </div>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}
