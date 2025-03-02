import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthProtector = ({ token, children }) => {
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default AuthProtector;
