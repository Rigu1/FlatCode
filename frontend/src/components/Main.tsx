// src/components/Header.tsx
import React from 'react';
import BoardSet from '@components/board/BoardSet'
import { StyledMain } from '@styles/styled-component/component/StyledMain';

const Main: React.FC = () => {
  return (
    <StyledMain>
      <BoardSet />
    </StyledMain>
  );
};

export default Main;