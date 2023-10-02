import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("userInfo");
  if (!token) {
    return <Navigate to='/login' />;
  }
  return children;
};
export default PrivateRoute;
