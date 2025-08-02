import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './../auth';
import Layout from '../components/Layout/Layout';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  console.log('isAuthenticated', isAuthenticated)
  return isAuthenticated ? <Layout>
      <Outlet />
    </Layout> : <Navigate to="/login" />;
};

export default PrivateRoute;
