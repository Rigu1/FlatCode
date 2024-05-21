// src/components/Header.tsx
import React from 'react';
import Main   from '@components/Main';
import Nav    from '@components/Nav';
import { StyledHome } from '@styles/styled-component/StyledHome';

const Home: React.FC = () => {
  return (
    <StyledHome>
      <Main />
      <Nav />
    </StyledHome>
  );
};

export default Home;