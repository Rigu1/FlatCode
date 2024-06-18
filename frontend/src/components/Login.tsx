import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '@app/store';
import { loginUser } from '@app/authSlice';
import styled from 'styled-components';

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

const Login: React.FC = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // 오류 상태 추가
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && username.trim() === '') {
      setError('Username is required');
    } else {
      setError('');
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUser({ username, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        navigate('/');
      } else {
        if (resultAction.payload) {
          setError(resultAction.payload as string);
        } else {
          setError('Login failed');
        }
        setStep(1); // 로그인 실패 시 다시 ID 입력 단계로 돌아갑니다.
        setUsername('');
        setPassword('');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      setStep(1); // 로그인 실패 시 다시 ID 입력 단계로 돌아갑니다.
      setUsername('');
      setPassword('');
    }
  };

  return (
    <Form onSubmit={step === 1 ? handleNextStep : handleSubmit}>
      {step === 1 ? (
        <>
          <Input
            type="text"
            placeholder="Enter your ID"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Button type="submit">Next</Button>
        </>
      ) : (
        <>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Login</Button>
        </>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Form>
  );
};

export default Login;
