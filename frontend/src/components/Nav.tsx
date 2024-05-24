// src/components/Header.tsx
import React from 'react';
import Address from '@components/Address';
import ImageComponent from '@components/common/ImageComponent';
import DashboardList from '@components/dashboard/DashboardList';
import { StyledNav } from '@styles/styled-component/component/StyledNav';


const Nav: React.FC = () => {
  return (
    <StyledNav>
      <div className="logo">
        <ImageComponent src="/images/logo_dack.png" alt="Our Company Logo"/>
      </div>
      <DashboardList />
      <Address />
    </StyledNav>
  );
};

export default Nav;