import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { setPrompt, fetchChatResponse, clearResponse } from '@app/chatSlice';

const Chat: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const prompt = useSelector((state: RootState) => state.chat.prompt);
  const response = useSelector((state: RootState) => state.chat.response);
  const loading = useSelector((state: RootState) => state.chat.loading);
  const error = useSelector((state: RootState) => state.chat.error);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchChatResponse(prompt));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPrompt(e.target.value));
  };

  const handleClear = () => {
    dispatch(clearResponse());
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask a question..."
          value={prompt}
          onChange={handleChange}
        />
        <button type="submit">Send</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {response && (
        <div>
          <h3>Response</h3>
          <p>{response}</p>
          <button onClick={handleClear}>Clear</button>
        </div>
      )}
    </div>
  );
};

export default Chat;
