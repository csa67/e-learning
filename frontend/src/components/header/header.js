import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import logo from '../assets/logo.png'; // Ensure this path is correct
import RegisterForm from '../auth/RegisterForm';
import './header.css'; // Adjust the path to where your styles.css file is located
import { fetchUserDetails } from '../utils/api';
import defaultProfileImg from '../assets/default-profile.png';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#003366' }}>
      <div className="container-fluid">
      <Link className="navbar-brand" to="/">
        <img src={logo} alt="Logo" style={{ height: '30px' }} className="me-3" /> {/* Added me-3 for margin */}
        NestKnowledge
      </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item custom-nav-link">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item custom-nav-link">
              <Link className="nav-link active" aria-current="page" to="/explore">Explore</Link>
            </li>
            {/* ... other nav items ... */}
          </ul>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ms-auto">
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <RegisterForm/>
              </li>
            </>
        </ul>
      </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
