import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch } from '@app/store';
import { registerUser } from '@app/authSlice';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
  width: 80%;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
  width: 80%;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 80%;

  &:hover {
    background-color: #218838;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

interface RegisterProps {
  onRegisterSuccess: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profession, setProfession] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && username.trim() === '') {
      setError('Username is required');
    } else if (step === 2 && password.trim() === '') {
      setError('Password is required');
    } else {
      setError('');
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(
        registerUser({ username, password, profession }),
      );
      if (registerUser.fulfilled.match(resultAction)) {
        onRegisterSuccess();
      } else {
        if (resultAction.payload) {
          setError(resultAction.payload as string);
        } else {
          setError('Registration failed');
        }
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <Form onSubmit={step < 3 ? handleNextStep : handleSubmit}>
        {step === 1 && (
          <>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <Button type="submit">Next</Button>
          </>
        )}
        {step === 2 && (
          <>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <Button type="submit">Next</Button>
          </>
        )}
        {step === 3 && (
          <>
            <Select
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              required
            >
              <option value="" disabled>
                Select your profession
              </option>
              <option value="Developer">Developer</option>
              <option value="Student">Student</option>
            </Select>
            <Button type="submit">Register</Button>
          </>
        )}
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default Register;
