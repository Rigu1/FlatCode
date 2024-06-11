import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import TodoList from './components/TodoList';
import Translate from './components/Translate';
import GoogleAuth from './components/GoogleAuth';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/todos" element={<TodoList />} />
        <Route path="/translate" element={<Translate />} />
        <Route path="/google-auth" element={<GoogleAuth />} />{' '}
        {/* EmailList 라우트 추가 */}
      </Routes>
    </Router>
  );
};

export default App;
