import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { logout } from '@app/authSlice';
import Chat from './Chat';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { username, profession, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isAuthenticated) {
    return <p>You need to login to access the dashboard</p>;
  }

  return (
    <div>
      <h2>Welcome, {username}</h2>
      <p>Profession: {profession}</p>
      <button onClick={handleLogout}>Logout</button>
      <Chat />
    </div>
  );
};

export default Dashboard;
