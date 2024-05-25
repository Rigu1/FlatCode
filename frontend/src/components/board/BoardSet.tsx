import React, { useState } from 'react';
import Board from '@components/board/BoardItem'
import AddBoardButton from '@components/board/AddBoardButton';
import { StyledBoardSet } from '@styles/styled-component/component/board/StyledBoardSet';

const initialBoard = [
  { id: 1},
  { id: 2},
  { id: 3},
];

const BoardSet: React.FC = () => {
  const [boards, setBoards] = useState(initialBoard);

  const addBoard = () => {
    const newBoard = {
      id: boards.length + 1
    };
    setBoards([...boards, newBoard]);
  };


  return (
    <StyledBoardSet>
      <div className="mainHead">
        <p>Main</p>
        <AddBoardButton onClick={addBoard} />
      </div>
      <div className="content">
        {boards.map(board => (
          <Board key={board.id} />
        ))}
      </div>
    </StyledBoardSet>
  );
};

export default BoardSet;