import React from 'react';
import '../Styles/navbar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <h3 className="logo">Logo</h3>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Portfolio">Portfolios</Link></li>
          <li><Link to="/video">Videos</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><Link to="/contactus">Contact Us</Link></li>
          <li><Link to="/admin">Admin</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
