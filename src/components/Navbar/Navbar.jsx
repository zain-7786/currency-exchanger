import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__left">
        <img src="/logo192.png" alt="Logo" className="navbar__logo" />
      </div>
      <div className="navbar__right">
        <Link to="/" className="navbar__link">Home</Link>
        <Link to="/currency_details" className="navbar__link">Details</Link>
      </div>
    </nav>
  );
};

export default Navbar;
