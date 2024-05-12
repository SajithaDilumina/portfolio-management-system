import React, { Component } from 'react'
import '../../User_UI/Styles/footer.css'

export default class footer extends Component {
  render() {
    return (
      <div>
        
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <h3>Skill Sync</h3>
          <p>SLIIT Malabe Campus, New Kandy Rd, Malabe</p>
          <p>Email: info@skillsync.com</p>
          <p>Phone: +94 75 494 7171</p>
        </div>
        <div className="footer-social">
          <h3>Connect with Us</h3>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} skill_Sync. All rights reserved.</p>
      </div>
      </footer>  
      </div>
    )
  }
}
