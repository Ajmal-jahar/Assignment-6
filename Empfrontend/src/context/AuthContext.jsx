import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [role, setRole] = useState(sessionStorage.getItem('role'));

  const login = async (username, password, expectedrole) => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { username, password });
      const { token, role } = res.data;

      if (role === expectedrole) {
        setToken(token);
        setRole(role);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('role', role);
        return true;
      } else {
        throw new Error('Incorrect role');
      }
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
