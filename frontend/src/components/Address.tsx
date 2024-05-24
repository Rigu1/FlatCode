// src/components/Header.tsx
import React from 'react';
import Setting from '@components/uesr/Setting';
import User from '@components/uesr/User';
import { StyledAddress } from '@styles/styled-component/component/StyledAddress';

const Address: React.FC = () => {
  return (
    <StyledAddress>
      <Setting />
      <div className="line"></div>
      <User />
    </StyledAddress>
  );
};

export default Address;