import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './../auth';

const PublicRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return !isAuthenticated ? <Outlet /> : <Navigate to="/app/dashboard" />;
};

export default PublicRoute;
