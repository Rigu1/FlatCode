// src/components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@app/store';
import {
  fetchDashboards,
  addDashboard,
  deleteDashboard,
  selectDashboard, // Ensure proper import
} from '@app/dashboardSlice';
import styled from 'styled-components';
import ImageComponent from './common/ImageComponent';
import ButtonComponent from './common/ButtonComponent';

const Container = styled.div`
  width: 200px;
`;

const DashboardItem = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  margin: 1em 0;
  padding: 1em;
  border-radius: 7px;
  cursor: pointer;
  background-color: ${(props) => (props.$isSelected ? '#222' : '#181818')};
  position: relative;

  &:hover {
    background-color: #333;
    transition: opacity 0.3s ease;

    .delete-button {
      opacity: 1;
    }
  }

  .delete-button {
    border-radius: 15px;
    opacity: 0;
    transition: opacity 0.3s ease;

    img {
      width: 1em;
    }
  }
`;

const DashboardTitle = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  cursor: pointer;

  .dashboard-icon {
    margin-right: 10px;
  }
`;

const DashboardInput = styled.input`
  padding: 8px;
  margin-right: 10px;
`;

const AddButton = styled(ButtonComponent)`
  padding: 8px;
  background-color: #181818;
  width: 100%;
`;

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Typed dispatch
  const dashboards = useSelector(
    (state: RootState) => state.dashboards.dashboards,
  );
  const selectedDashboard = useSelector(
    (state: RootState) => state.dashboards.selectedDashboard,
  );
  const [newTitle, setNewTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    dispatch(fetchDashboards());
  }, [dispatch]);

  useEffect(() => {
    if (dashboards.length > 0 && !selectedDashboard) {
      dispatch(selectDashboard(dashboards[0]._id));
    }
  }, [dashboards, selectedDashboard, dispatch]);

  const handleAddDashboard = () => {
    if (newTitle.trim()) {
      if (dashboards.length >= 5) {
        alert('You cannot add more than 5 dashboards.');
        setIsAdding(false);
        return;
      }
      dispatch(addDashboard(newTitle));
      setNewTitle('');
      setIsAdding(false);
    } else {
      setIsAdding(true);
    }
  };

  const handleDeleteDashboard = (id: string) => {
    dispatch(deleteDashboard(id));
  };

  const handleSelectDashboard = (id: string) => {
    dispatch(selectDashboard(id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddDashboard();
    }
  };

  // Create a copy of dashboards and sort it to bring selected dashboard to the top
  const sortedDashboards = [...dashboards].sort((a, b) => {
    if (a._id === selectedDashboard?._id) return -1;
    if (b._id === selectedDashboard?._id) return 1;
    return 0;
  });

  return (
    <Container>
      {sortedDashboards.map((dashboard, index) => (
        <DashboardItem
          key={dashboard._id}
          $isSelected={dashboard._id === selectedDashboard?._id}
          onClick={() => handleSelectDashboard(dashboard._id)}
        >
          <DashboardTitle>
            <ImageComponent
              src={`/images/dashboard_${index + 1}.svg`}
              alt="dashboard icon"
              className="dashboard-icon"
            />
            {dashboard.title}
          </DashboardTitle>
          <ButtonComponent
            imageProps={{ src: '/images/close_icon.svg', alt: 'Delete' }}
            text=""
            onClick={() => handleDeleteDashboard(dashboard._id)}
            className="delete-button"
            size="small"
          />
        </DashboardItem>
      ))}
      {isAdding && (
        <DashboardItem $isSelected={false}>
          <DashboardInput
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter new title"
            autoFocus
          />
        </DashboardItem>
      )}
      {!isAdding && (
        <AddButton
          onClick={() => setIsAdding(true)}
          imageProps={{
            src: '/images/add_icon.svg',
            alt: 'add button',
            className: 'dashboard-add-button',
          }}
          text=""
          className="add-dashboard-button"
          size="small"
        />
      )}
    </Container>
  );
};

export default Dashboard;
