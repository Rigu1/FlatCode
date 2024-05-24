import React from 'react';
import ImageComponent from '@components/common/ImageComponent';
import { StyledSetting } from '@styles/styled-component/component/user/StyledSetting';

const Setting: React.FC = () => {
  return (
    <StyledSetting>
      <ImageComponent src='/images/setting.svg' alt='dashboard icon' />
      <p>Setting</p>
    </StyledSetting>
  );
};

export default Setting;