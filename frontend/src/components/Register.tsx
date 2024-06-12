import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profession, setProfession] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        { username, password, profession },
        { withCredentials: true },
      );
      if (response.data.message) {
        navigate('/login');
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <select
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          required
        >
          <option value="" disabled>
            Select your profession
          </option>
          <option value="Doctor">Doctor</option>
          <option value="Engineer">Engineer</option>
          <option value="Teacher">Teacher</option>
          <option value="Artist">Artist</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
