import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    });
  
    // Log the initial user state to verify it's not null
    console.log('Initial user state:', user);
  
    useEffect(() => {
      localStorage.setItem('user', JSON.stringify(user));
    }, [user]);
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  };
  

export default UserContext;
