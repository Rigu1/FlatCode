import React from 'react';
import ImageComponent from '@components/common/ImageComponent';
import { StyledAddDashboardButton } from '@styles/styled-component/component/dashboard/StyledAddDashboardButton';

interface AddDashboardButtonProps {
  onClick: () => void;
}

const AddDashboardButton: React.FC<AddDashboardButtonProps> = ({ onClick }) => {
  return (
    <StyledAddDashboardButton>
      <button onClick={onClick}>
        <ImageComponent src='/images/add_button.svg' alt='add button' />
      </button>
    </StyledAddDashboardButton>
  );
};

export default AddDashboardButton;