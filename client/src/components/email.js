import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Footer from '../pages/User_UI/U_Pages/footer';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';

export default function Email() {
  const form = useRef();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_e2hz19y', 'template_p6gu0py', form.current, {
        publicKey: 'O6SScQuPaWzULd-4Q',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setShowSuccessMessage(true);
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  const styles = `
  .email-form-container {
    margin: 120px auto 0;
    max-width: 500px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Add this line for box shadow */
  }
  

    .email-form-container label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    .email-form-container input[type="text"],
    .email-form-container input[type="email"],
    .email-form-container input[type="datetime-local"],
    .email-form-container textarea {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid #ccc; /* Adjust the border color */
      border-radius: 5px;
    }
    

    .email-form-container textarea {
      height: 150px;
    }

    .email-form-container input[type="submit"],
    .email-form-container button {
      background-color: #3A7D90;
      color: white;
      transition: background-color 0.3s;
    }

    .email-form-container input[type="submit"]:hover,
    .email-form-container button:hover {
      background-color: #1e4b58;
    }

    .email-form-container .success-message {
      color: green;
      margin-top: 10px;
    }

    .email-form-container .error-message {
      color: red;
      margin-top: 10px;
    }
  `;

  return (
    <div>
      <style>{styles}</style>
      <div className="email-form-container">
        <h2 style={{ textAlign: 'center', color: '#3A7D90' }}>Submit Your Customized Portfolio Details</h2>
        <p style={{ textAlign: 'center', marginBottom: '20px' }}>Please provide your portfolio title, a brief description, and select a date and time for the meeting.</p>
        <form ref={form} onSubmit={sendEmail}>

          <label>Name</label>
          <input type="text" name="user_name" />

          <label>Email</label>
          <input type="email" name="user_email" />

          <label>Message</label>
          <textarea name="message" />

          <label>Date and Time for Meeting</label>
          <input type="datetime-local" name="meeting_datetime" />

          <input type="submit" value="Send" />

          <label><strong>Meeting</strong></label>
          <label>If Skillsync confirms your meeting, please click the 'Join meeting' button to attend at the requested time.</label>

          <Link to={"/vchat"}>
            <button className="meeting_button">Video call</button>
          </Link> 
        </form>
        {showSuccessMessage && (
          <div className="success-message">Your message has been sent successfully!</div>
        )}
      </div>
      {/* <NavBar />
      <Footer /> */}
    </div>
  );
}
