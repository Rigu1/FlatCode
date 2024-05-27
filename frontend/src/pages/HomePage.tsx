// src/components/Header.tsx
import { FC } from 'react';
import Main from '@components/Main';
import Nav from '@components/Nav';
import { StyledHomePage } from '@styles/styled-component/page/StyledHomePage';

const Home: FC = () => {
  return (
    <StyledHomePage>
      <Nav />
      <Main />
    </StyledHomePage>
  );
};

export default Home;
