// src/components/Header.tsx
import React from 'react';
import ImageComponent from '@components/common/ImageComponent';
import DashboardList from '@components/nav/DashboardList';
import { StyledNav } from '@styles/styled-component/component/StyledNav';


const Nav: React.FC = () => {
  return (
    <StyledNav>
      <div className="logo">
        <ImageComponent src="/images/logo_dack.png" alt="Our Company Logo"/>
      </div>
      <DashboardList />
    </StyledNav>
  );
};

export default Nav;