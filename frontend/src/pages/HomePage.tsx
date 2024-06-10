import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Register from '../components/Register';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';

const HomePage: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return (
    <div>
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <>
          <Register />
          <Login />
        </>
      )}
    </div>
  );
};

export default HomePage;
