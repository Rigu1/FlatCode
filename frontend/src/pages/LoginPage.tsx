import React, { useState } from 'react';
import styled from 'styled-components';
import Login from '@components/Login';
import Register from '@components/Register';
import ImageComponent from '@components/common/ImageComponent';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f6f8fa;

  img {
    width: 160px;
  }
`;

const FormWrapper = styled.div`
  background: #ffffff;
  border: 1px solid #e1e4e8;
  padding: 1.5em 3em 3em 3em;
  border-radius: 6px;
  box-shadow:
    0 1px 3px rgba(27, 31, 35, 0.12),
    0 8px 24px rgba(27, 31, 35, 0.08);
  width: 100%;
  max-width: 320px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #24292e;
  margin-bottom: 20px;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #0366d6;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const Paragraph = styled.p`
  font-size: 14px;
  color: #586069;
`;

const LoginPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleRegisterSuccess = () => {
    setShowLogin(true);
  };

  return (
    <Container>
      <FormWrapper>
        <ImageComponent
          src="/images/logo_light.png"
          alt="logo"
          className="logo"
        />
        <Title>
          {showLogin ? 'Sign in to FlatCode' : 'Create your account'}
        </Title>
        {showLogin ? (
          <div>
            <Login />
            <Paragraph>
              Don't have an account?{' '}
              <ToggleButton onClick={() => setShowLogin(false)}>
                Register
              </ToggleButton>
            </Paragraph>
          </div>
        ) : (
          <div>
            <Register onRegisterSuccess={handleRegisterSuccess} />
            <Paragraph>
              Already have an account?{' '}
              <ToggleButton onClick={() => setShowLogin(true)}>
                Login
              </ToggleButton>
            </Paragraph>
          </div>
        )}
      </FormWrapper>
    </Container>
  );
};

export default LoginPage;
