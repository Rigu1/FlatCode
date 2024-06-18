import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@app/store';
import {
  updateBoardType,
  addBoardToDashboard,
  removeBoardFromDashboard,
  mergeBoardsInDashboard,
} from '@app/dashboardSlice';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BoardItem from './BoardItem';

const Container = styled.div`
  padding: 0 20px 20px 20px;
  position: relative;

  .main-head {
    display: flex;
  }
`;

const AddButton = styled.button`
  padding: 8px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  position: fixed; /* 고정된 위치 */
  top: 20px; /* 화면 상단에서 20px */
  right: 20px; /* 화면 오른쪽에서 20px */
  z-index: 1000; /* 다른 요소 위에 위치 */

  &:hover {
    background-color: #218838;
  }
`;

const BoardGrid = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, 1fr);
  gap: 20px;
  margin-top: 4em;
  width: 100%;
`;

interface BoardType {
  type: string;
  isMerged?: boolean;
}

const Board: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedDashboard = useSelector(
    (state: RootState) => state.dashboards.selectedDashboard,
  );

  const [boards, setBoards] = useState<BoardType[]>(
    selectedDashboard?.boards || [],
  );

  useEffect(() => {
    setBoards(selectedDashboard?.boards || []);
  }, [selectedDashboard]);

  const moveBoard = (dragIndex: number, hoverIndex: number) => {
    if (!selectedDashboard) return;
    const newBoards = [...boards];
    const [draggedBoard] = newBoards.splice(dragIndex, 1);
    newBoards.splice(hoverIndex, 0, draggedBoard);
    setBoards(newBoards);
  };

  const mergeBoard = (sourceIndex: number, targetIndex: number) => {
    if (!selectedDashboard) return;

    const newBoards = [...boards];
    const sourceBoard = newBoards[sourceIndex];
    const targetBoard = newBoards[targetIndex];

    // Merge logic: Mark target board as merged and set the type of the source board
    newBoards[targetIndex] = {
      ...targetBoard,
      type: sourceBoard.type,
      isMerged: true,
    };
    newBoards.splice(sourceIndex, 1);
    setBoards(newBoards);

    // Dispatch an action to update the boards in the store
    dispatch(
      mergeBoardsInDashboard({
        dashboardId: selectedDashboard._id,
        targetIndex,
        sourceIndex,
      }),
    );
  };

  const removeBoard = (index: number) => {
    if (!selectedDashboard) return;
    const newBoards = boards.filter((_, i) => i !== index);
    setBoards(newBoards);
    dispatch(
      removeBoardFromDashboard({ dashboardId: selectedDashboard._id, index }),
    );
  };

  const updateBoardTypeHandler = (index: number, type: string) => {
    if (!selectedDashboard) return;
    const newBoards = boards.map((board, i) =>
      i === index ? { ...board, type } : board,
    );
    setBoards(newBoards);
    dispatch(
      updateBoardType({ dashboardId: selectedDashboard._id, index, type }),
    );
  };

  const addBoard = () => {
    if (!selectedDashboard) return;
    dispatch(
      addBoardToDashboard({ dashboardId: selectedDashboard._id, type: 'none' }),
    );
  };

  return (
    <Container>
      <div className="main-head">
        <AddButton onClick={addBoard}>Add Board</AddButton>
      </div>
      <DndProvider backend={HTML5Backend}>
        <BoardGrid $columns={4}>
          {boards.map((board, index) => (
            <BoardItem
              key={index}
              index={index}
              board={board}
              moveBoard={moveBoard}
              mergeBoard={mergeBoard}
              removeBoard={removeBoard}
              updateBoardType={updateBoardTypeHandler}
            />
          ))}
        </BoardGrid>
      </DndProvider>
    </Container>
  );
};

export default Board;
