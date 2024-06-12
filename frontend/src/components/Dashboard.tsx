import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@app/store';
import {
  fetchDashboards,
  addDashboard,
  deleteDashboard,
  selectDashboard,
} from '@app/dashboardSlice';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const DashboardItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

const DashboardTitle = styled.div`
  flex-grow: 1;
`;

const DashboardInput = styled.input`
  padding: 8px;
  margin-right: 10px;
`;

const AddButton = styled.button`
  padding: 8px;
`;

const DeleteButton = styled.button`
  padding: 8px;
  margin-left: 10px;
`;

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const dashboards = useSelector(
    (state: RootState) => state.dashboards.dashboards,
  );
  const [newTitle, setNewTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    dispatch(fetchDashboards());
  }, [dispatch]);

  const handleAddDashboard = async () => {
    if (newTitle.trim()) {
      const action = await dispatch(addDashboard(newTitle));
      setNewTitle('');
      setIsAdding(false);
      if (action.payload && action.payload._id) {
        dispatch(selectDashboard(action.payload._id));
      }
    } else {
      setIsAdding(true);
    }
  };

  const handleDeleteDashboard = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 클릭 이벤트 전파 중지
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

  return (
    <Container>
      {dashboards.map((dashboard) => (
        <DashboardItem
          key={dashboard._id}
          onClick={() => handleSelectDashboard(dashboard._id)}
        >
          <DashboardTitle>{dashboard.title}</DashboardTitle>
          <DeleteButton
            onClick={(e) => handleDeleteDashboard(dashboard._id, e)}
          >
            Delete
          </DeleteButton>
        </DashboardItem>
      ))}
      {isAdding && (
        <DashboardItem>
          <DashboardInput
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter new dashboard title"
            autoFocus
          />
          <AddButton onClick={handleAddDashboard}>Add</AddButton>
        </DashboardItem>
      )}
      {!isAdding && (
        <AddButton onClick={() => setIsAdding(true)}>Add Dashboard</AddButton>
      )}
    </Container>
  );
};

export default Dashboard;
