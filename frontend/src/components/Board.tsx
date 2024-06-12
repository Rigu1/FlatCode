import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@app/store';
import {
  addBoardToDashboard,
  removeBoardFromDashboard,
  updateBoardType,
} from '@app/dashboardSlice';
import styled from 'styled-components';
import ChatComponent from './Chat';
import TranslateComponent from './Translate';
import TodoList from './TodoList';
import GoogleAuth from './GoogleAuth';

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  h2 {
    margin: 0;
  }
`;

const AddButton = styled.button`
  padding: 8px;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  padding: 8px;
  margin-left: 10px;
`;

const BoardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FunctionButton = styled.button`
  padding: 8px;
  margin: 5px 0;
`;

const Board: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedDashboard = useSelector(
    (state: RootState) => state.dashboards.selectedDashboard,
  );

  const handleAddComponent = () => {
    if (selectedDashboard) {
      dispatch(
        addBoardToDashboard({
          dashboardId: selectedDashboard._id,
          type: 'none',
        }),
      );
    }
  };

  const handleRemoveComponent = (index: number) => {
    if (selectedDashboard) {
      dispatch(
        removeBoardFromDashboard({ dashboardId: selectedDashboard._id, index }),
      );
    }
  };

  const handleUpdateBoardType = (index: number, type: string) => {
    if (selectedDashboard) {
      dispatch(
        updateBoardType({ dashboardId: selectedDashboard._id, index, type }),
      );
    }
  };

  if (!selectedDashboard) {
    return <div>Please select a dashboard.</div>;
  }

  return (
    <Container>
      <AddButton onClick={handleAddComponent}>Add Board</AddButton>
      {selectedDashboard.boards &&
        selectedDashboard.boards.map((board, index) => (
          <div key={index}>
            <Header>
              <h2>
                {board.type === 'chat'
                  ? 'Chat'
                  : board.type === 'translate'
                    ? 'Translate'
                    : board.type === 'todolist'
                      ? 'Todo List'
                      : board.type === 'gmail'
                        ? 'Gmail'
                        : 'Select Function'}
              </h2>
              <CloseButton onClick={() => handleRemoveComponent(index)}>
                Close
              </CloseButton>
            </Header>
            <BoardContent>
              {board.type === 'chat' && <ChatComponent />}
              {board.type === 'translate' && <TranslateComponent />}
              {board.type === 'todolist' && <TodoList />}
              {board.type === 'gmail' && <GoogleAuth />}
              {board.type === 'none' && (
                <div>
                  <FunctionButton
                    onClick={() => handleUpdateBoardType(index, 'chat')}
                  >
                    Add Chat Component
                  </FunctionButton>
                  <FunctionButton
                    onClick={() => handleUpdateBoardType(index, 'translate')}
                  >
                    Add Translate Component
                  </FunctionButton>
                  <FunctionButton
                    onClick={() => handleUpdateBoardType(index, 'todolist')}
                  >
                    Add Todo List Component
                  </FunctionButton>
                  <FunctionButton
                    onClick={() => handleUpdateBoardType(index, 'gmail')}
                  >
                    Add Gmail Component
                  </FunctionButton>
                </div>
              )}
            </BoardContent>
          </div>
        ))}
    </Container>
  );
};

export default Board;
