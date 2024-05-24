import React, { useState } from 'react';
import Dashboard from '@components/dashboard/DashboradItem';
import AddDashboardButton from '@components/dashboard/AddDashboardButton';
import { StyledDashboardList } from '@styles/styled-component/component/dashboard/StyledDashboardList';

const initialDashboards = [
  { id: 1, imagePath: '/images/dashboard_first.svg' },
];

const imageNames = ['first', 'second', 'third', 'fourth'];

const DashboardList: React.FC = () => {
  const [dashboards, setDashboards] = useState(initialDashboards);

  const addDashboard = () => {
    if (dashboards.length < imageNames.length) {
      const newDashboard = {
        id: dashboards.length + 1,
        imagePath: `/images/dashboard_${imageNames[dashboards.length]}.svg`
      };
      setDashboards([...dashboards, newDashboard]);
    } else {
      alert('No more dashboards can be added.');
    }
  };

  return (
    <StyledDashboardList>
      <p>board</p>
      <Dashboard key={0} imagePath={'/images/dashboard_main.svg'} />
      <div className="line"></div>
      {dashboards.map(dashboard => (
        <Dashboard key={dashboard.id} imagePath={dashboard.imagePath} />
      ))}
      <AddDashboardButton onClick={addDashboard} />
    </StyledDashboardList>
  );
};

export default DashboardList;