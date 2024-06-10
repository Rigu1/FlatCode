import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchTodos, addTodo, updateTodo } from '../app/todoSlice';

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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="todo-list">
      <h2>To-Do List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            <label className="todo-label">
              {todo.text}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) =>
                  handleUpdateTodo(todo._id, todo.text, e.target.checked)
                }
                className="todo-checkbox"
              />
            </label>
          </li>
        ))}
        <li className="todo-item">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task and press Enter"
            className="todo-input"
          />
        </li>
      </ul>
    </div>
  );
};

export default TodoList;
