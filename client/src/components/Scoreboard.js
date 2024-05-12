import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./styles/ScoreBoard.css";
import CertificateTemplate from "./CertificateTemplate";
import html2pdf from "html2pdf.js";
import EMBLEMS from "./images/EMBLEM.png";

const Scoreboard = () => {
  const [rankedMarks, setRankedMarks] = useState([]);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const correct = searchParams.get("correct");
  const milliseconds = parseInt(searchParams.get("time"));

  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  useEffect(() => {
    axios
      .get("http://localhost:5000/results/scores")
      .then((response) => {
        setRankedMarks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching scores:", error);
      });

    if (correct && parseInt(correct) >= 7) {
      setShowCongratulations(true);
    }
  }, []);

  const handleDownloadCertificate = () => {
    // Show the certificate
    setShowCertificate(true);

    // Wait for a brief moment for the certificate content to render
    setTimeout(() => {
      const element = document.getElementById("certificate");
      html2pdf(element, {
        margin: 0,
        filename: "certificate.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: "pt", format: [600, 800], orientation: "portrait" },
      });

      // Hide the certificate after generating PDF
      setShowCertificate(false);
    }, 100); // Adjust the delay as needed
  };

  return (
    <div className="exam-container">
      <h1 style={{ color: "#3a7d90", textAlign: "center" }}>Scoreboard</h1>
      <div className="score-details">
        <p>Correct Answers: {correct}</p>
        <p>
          Time Taken: {minutes} mins {remainingSeconds} secs
        </p>
      </div>
      {showCongratulations && (
        <div id="score-con">
          <div id="congratulations-message">
            Congratulations! You passed the test. Here's your emblem.
            <br />
            <img id="emblem" src={EMBLEMS}></img>
          </div>
        </div>
      )}
      {parseInt(correct) >= 7 && (
        <button onClick={handleDownloadCertificate} id="pdfButton">
          Download the PDF
        </button>
      )}
      <div
        id="certificate"
        style={{ display: showCertificate ? "block" : "none" }}
      >
        <CertificateTemplate
          correctAnswers={correct}
          minutes={minutes}
          remainingSeconds={remainingSeconds}
        />
      </div>
      <table className="score-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Correct Answers</th>
            <th>Time Taken (seconds)</th>
          </tr>
        </thead>
        <tbody>
          {rankedMarks.map((score, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{score.userName}</td>
              <td>{score.correctAnswers}</td>
              <td>{score.timeTaken}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;
