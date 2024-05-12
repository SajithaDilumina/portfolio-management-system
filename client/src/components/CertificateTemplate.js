import React from "react";
import "./styles/CertificateTemplate.css";
import LUMINOLENS from "./images/LUMINOLENS.png";

const CertificateTemplate = ({ correctAnswers, minutes, remainingSeconds }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div id="pm-certificate-container">
      <div id="outer-border"></div>
      <div id="inner-border"></div>

      <div id="certificate-content">
        <div id="header">
          <h2>Certificate of Photography Excellence</h2>
          <br />
        </div>

        <div id="body">
          <div id="recipient-info">
            <span>This is to certify that</span>
            <span>(Recipient's Name)</span>
          </div>

          <div id="achievement-details">
            <p>
              (Recipient's Name) has demonstrated exceptional skills and
              dedication in the art of photography.
              <br /> Through passion, creativity, and technical proficiency,
              they have achieved a score of {correctAnswers} out of 10 questions
              in {minutes} minutes and {remainingSeconds} seconds.
            </p>
          </div>
        </div>

        <div id="award-info">
          Award for:
          <br />
          <div id="emblem-text">'LUMINOLENS MASTER'</div>
        </div>

        <div>
          <img id="emblem" src={LUMINOLENS}></img>
        </div>

        <div id="footer">
          <div id="signature">
            <p>Authorized Signature</p>
          </div>
          <div id="date">
            <p>Date: {currentDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplate;
