import React, { useState } from 'react';
import Login from '@components/Login';
import Register from '@components/Register';

const LoginPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      {showLogin ? (
        <div>
          <Login />
          <p>
            Don't have an account?{' '}
            <button onClick={() => setShowLogin(false)}>Register</button>
          </p>
        </div>
      ) : (
        <div>
          <Register />
          <p>
            Already have an account?{' '}
            <button onClick={() => setShowLogin(true)}>Login</button>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
