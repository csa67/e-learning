// SideMenu.js
import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import { fetchUserDetails } from '../utils/api';
import UserContext from '../auth/UserContext'; // Update with the correct path to UserContext
import './sideMenuStyles.css'; // Update with the correct path to your CSS file
import 'boxicons/css/boxicons.min.css';
import { SidebarContext } from './SideMenuContext';
import { useNavigate } from 'react-router-dom';
import defaultProfileImg from '../assets/default-profile.png';

const SideMenu = () => {
  const { user, setUser } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const { isNavExpanded, toggleNav } = useContext(SidebarContext);
  const navigate = useNavigate();    
  const handleLogout = () => {
    setUser(null); // Remove user from context
    localStorage.removeItem('user'); // Remove user from localStorage
    navigate('/login'); // Redirect to login page
  };

  const handleDashboard = () => {
    // Check user role and navigate accordingly
    const role = userData.data.userType;
    if (role === 'student') {
      navigate('/studentDash');
    } else if (role === 'professor') {
      navigate('/professorDash');
    } else if (role === 'admin') {
      navigate('/adminDash');
    } 
  };

  const handleHome = () => {
    navigate('/'); // Redirect to login page
  };

  const handleReset = () => {
    navigate('/reset'); // Redirect to login page
  };
  const handleProfile = () => {
    navigate('/edit-profile'); // Redirect to login page
  };
  const handleExplore = () => {
    navigate('/Explore'); // Redirect to login page
  };


  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      console.log('Retrieved user data:', userData);

      fetchUserDetails(userData.userId)
        .then((fetchedData) => {
          setUserData(fetchedData); // Assuming fetchedData contains the user data directly
        })
        .catch((error) => {
          console.error('Error fetching user data', error);
        });
    }
  }, [user?.userId]);


  return userData ? (
    <>
    <div className='sidebar-page' style={{textDecoration: 'none'}}>
    <div className={`sidebar ${isNavExpanded ? 'expanded' : 'collapsed'}`}>
      <header className="header" id="header">
        <div className="header_toggle" onClick={toggleNav} id="header-toggle">
            <i class={`bx ${isNavExpanded ? 'bx-x' : 'bx-menu'}`} ></i>
        </div>
        <div className="header_img">
          <img src={userData.data.image || defaultProfileImg} alt="Profile" />
        </div>
      </header>
      <div className={`l-navbar ${isNavExpanded ? 'show' : ''}`} id="nav-bar">
        <nav className="nav">
        <div> 
          <div href="#" class="nav_logo"> <img src={logo} alt="Logo"  class='nav_icon' style={{ height: '30px' }}/> <span class="nav_logo-name">NestKnowledge</span> </div>
              <div class="nav_list"> 
                <div onClick={handleDashboard} class="nav_link"> <i class='bx bx-grid-alt nav_icon'></i> <span class="nav_name">Dashboard</span> </div> 
                <div onClick={handleHome} class="nav_link"> <i class='bx bx-home nav_icon'></i> <span class="nav_name">Home</span> </div> 
                <div onClick={handleExplore} class="nav_link"> <i class='bx bx-compass nav_icon'></i> <span class="nav_name">Explore</span> </div>
                <div onClick={handleProfile} class="nav_link"> <i class='bx bx-user nav_icon'></i> <span class="nav_name">Edit Profile</span> </div> 
                <div onClick={handleReset} class="nav_link"> <i class='bx bx-folder nav_icon'></i> <span class="nav_name">Password</span> </div> 
              </div>
          </div> 
          <div class="nav_bottom">
          <div onClick={handleLogout} class="nav_logo"> <i class='bx bx-log-out nav_icon'></i> <span class="nav_name">SignOut</span> 
          </div>
          </div>
        </nav>
      </div>
      </div>
      </div>
    </>
  ) : null;
};

export default SideMenu;
