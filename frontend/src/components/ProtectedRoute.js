import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ authToken, children }) => {
  if (!authToken) {
    return <Navigate to="/signin" />;
  }
  return children;
};

export default ProtectedRoute;
