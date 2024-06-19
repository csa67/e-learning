// Layout.js
import React, { useState, useEffect, useContext } from 'react';
import { SidebarContext } from './SideMenuContext';
import SideMenu from './SideMenu';
import Header from './header';
import './Layout.css'; // Path to your Layout CSS
import UserContext from '../auth/UserContext';
import { fetchUserDetails } from '../utils/api';
import Footer from '../footer/Footer';

const Layout = ({ children }) => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  const toggleNav = () => {
    setIsNavExpanded(!isNavExpanded);
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

  return (
    <>
    {userData ? (
    <SidebarContext.Provider value={{ isNavExpanded, toggleNav }}>
      <SideMenu />
      <div className={`content main-content ${isNavExpanded ? 'expanded' : ''}`}>
        {children}
      </div>
      <footer className="footer">
       <Footer/>
      </footer>
    </SidebarContext.Provider>
    ):(
      <div className="header-main">
    <Header/>
    <div >
        {children}
      </div>
      </div>)}
    </>
  );
  
};

export default Layout;
