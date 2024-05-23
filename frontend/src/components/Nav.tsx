// src/components/Header.tsx
import React from 'react';
import ImageComponent from '@components/common/ImageComponent';
import { StyledNav } from '@styles/styled-component/StyledNav';

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <div className="logo">
        <ImageComponent src="/images/logo_dack.jpeg" alt="Our Company Logo" width="200" height="100"/>
      </div>
    </StyledNav>
  );
};

export default Nav;