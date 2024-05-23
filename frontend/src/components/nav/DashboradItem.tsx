import React from 'react';
import ImageComponent from '@components/common/ImageComponent';
import { StyledDashboardItem } from '@styles/styled-component/component/nav/StyledDashboardItem';

interface DashboardProps {
  imagePath: string;
}

const Dashboard: React.FC<DashboardProps> = ({ imagePath }) => {
  return (
    <StyledDashboardItem>
      <ImageComponent src={imagePath} alt='dashboard icon' />
    </StyledDashboardItem>
  );
};

export default Dashboard;