import React from 'react'
import { Link } from "react-router-dom";
// import "../../User_UI/Styles/navbar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <h3 className="logo">Logo</h3>

        <ul className="nav-links">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/portfolio">
            <li>Portfolios</li>
          </Link>
          <Link to="/video">
            <li>videos</li>
          </Link>
          <Link to="/aboutus">
            <li>About Us</li>
          </Link>
          <Link to="/contactus">
            <li>Contact Us</li>
          </Link>
          <Link to="/contactus">
            <li>admin</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar
