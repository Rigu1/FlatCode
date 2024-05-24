import React from 'react';
import ImageComponent from '@components/common/ImageComponent';
import { StyledUser } from '@styles/styled-component/component/user/StyledUser';

const User: React.FC = () => {
  return (
    <StyledUser>
      <ImageComponent src='images/account.svg' alt='dashboard icon' />
      <p>User</p>
    </StyledUser>
  );
};

export default User;