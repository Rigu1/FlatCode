import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styled from 'styled-components';
import ChatComponent from './Chat';
import TranslateComponent from './Translate';
import TodoList from './TodoList';
import GoogleAuth from './GoogleAuth';
import ImageComponent from './common/ImageComponent';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  h2 {
    margin: 0;
  }
`;

const CloseButton = styled.button`
  padding: 0.5em;
  cursor: pointer;
  border-radius: 8px;
  background-color: #dc143c;

  &:hover {
    background-color: #b22222;
  }
`;

const BoardItemContainer = styled.div<{ $isMerged: boolean }>`
  background: #282828;
  padding: 1em;
  border-radius: 8px;
  box-shadow: 0 6px 6px rgba(0, 0, 0.5, 0.5);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  height: 320px;
  transition: all 0.3s ease;

  ${(props) =>
    props.$isMerged &&
    `
    grid-column: span 2;
  `}

  .delete-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .fun-icon {
    width: 1.3em;
  }
`;

const FunctionButton = styled.button`
  padding: 8px;
  margin: 5px 0;
  cursor: pointer;
`;

const ItemTypes = {
  BOARD: 'board',
};

interface BoardType {
  type: string;
  isMerged?: boolean;
}

interface BoardItemProps {
  board: BoardType;
  index: number;
  moveBoard: (dragIndex: number, hoverIndex: number) => void;
  mergeBoard: (sourceIndex: number, targetIndex: number) => void;
  removeBoard: (index: number) => void;
  updateBoardType: (index: number, type: string) => void;
}

const BoardItem: React.FC<BoardItemProps> = ({
  board,
  index,
  moveBoard,
  mergeBoard,
  removeBoard,
  updateBoardType,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BOARD,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.BOARD,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveBoard(item.index, index);
      }
    },
    drop: (item: { index: number }) => {
      if (item.index !== index) {
        mergeBoard(item.index, index);
      }
    },
  });

  drag(drop(ref));

  return (
    <BoardItemContainer
      ref={ref}
      $isMerged={!!board.isMerged}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Header>
        <h2>
          {board.type === 'chat' ? (
            <ImageComponent
              src="/images/chatgpt.svg"
              alt="chatgpt"
              className="fun-icon"
            />
          ) : board.type === 'translate' ? (
            <ImageComponent
              src="/images/translate.svg"
              alt="translate"
              className="fun-icon"
            />
          ) : board.type === 'todolist' ? (
            <ImageComponent
              src="/images/todo-list.svg"
              alt="chatgpt"
              className="fun-icon"
            />
          ) : board.type === 'gmail' ? (
            <ImageComponent
              src="/images/gmail.png"
              alt="chatgpt"
              className="fun-icon"
            />
          ) : (
            'Select Function'
          )}
        </h2>
        <CloseButton
          className="delete-button"
          onClick={() => removeBoard(index)}
        ></CloseButton>
      </Header>
      {board.type === 'chat' && <ChatComponent />}
      {board.type === 'translate' && <TranslateComponent />}
      {board.type === 'todolist' && <TodoList />}
      {board.type === 'gmail' && <GoogleAuth />}
      {board.type === 'none' && (
        <div>
          <FunctionButton onClick={() => updateBoardType(index, 'chat')}>
            Add Chat Component
          </FunctionButton>
          <FunctionButton onClick={() => updateBoardType(index, 'translate')}>
            Add Translate Component
          </FunctionButton>
          <FunctionButton onClick={() => updateBoardType(index, 'todolist')}>
            Add Todo List Component
          </FunctionButton>
          <FunctionButton onClick={() => updateBoardType(index, 'gmail')}>
            Add Gmail Component
          </FunctionButton>
        </div>
      )}
    </BoardItemContainer>
  );
};

export default BoardItem;
