import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../app/todoSlice';
import styled from 'styled-components';

const TodoListContainer = styled.div`
  padding: 20px;
  label {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

const TodoItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TodoInput = styled.input`
  flex-grow: 1;
  padding: 8px;
`;

const TodoButton = styled.button`
  padding: 8px;
  margin-left: 10px;
`;

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      dispatch(addTodo(newTodoText));
      setNewTodoText('');
    }
  };

  const handleUpdateTodo = (id: string, text: string, completed: boolean) => {
    dispatch(updateTodo({ id, text, completed }));
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <TodoListContainer>
      <h2>To-Do List</h2>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo._id}>
            <label>
              {todo.text}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) =>
                  handleUpdateTodo(todo._id, todo.text, e.target.checked)
                }
              />
            </label>
            <TodoButton onClick={() => handleDeleteTodo(todo._id)}>
              Delete
            </TodoButton>
          </TodoItem>
        ))}
        <TodoItem>
          <TodoInput
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task and press Enter"
          />
          <TodoButton onClick={handleAddTodo}>Add</TodoButton>
        </TodoItem>
      </ul>
    </TodoListContainer>
  );
};

export default TodoList;
