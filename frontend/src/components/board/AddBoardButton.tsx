import React from 'react';
import ImageComponent from '@components/common/ImageComponent';
import { StyledAddBoardButton } from '@styles/styled-component/component/board/StyledAddBoardButton';

interface AddBoardButtonProps {
  onClick: () => void;
}

const AddBoardButton: React.FC<AddBoardButtonProps> = ({ onClick }) => {
  return (
    <StyledAddBoardButton>
      <button onClick={onClick}>
        <ImageComponent src='/images/add_button.svg' alt='add button' />
      </button>
    </StyledAddBoardButton>
  );
};
  
export default AddBoardButton;