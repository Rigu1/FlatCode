// src/components/Header.tsx
import { FC, useState } from 'react';
import Main from '@components/Main';
import Nav from '@components/Nav';

const Home: FC = () => {
  const [mode, setMode] = useState('home');

  const toggleMode = () => {
    setMode((prevMode: string) => (prevMode === 'home' ? 'edit' : 'home'));
  };

  return (
    <div>
      <Nav mode={mode} />
      <Main mode={mode} toggleMode={toggleMode} />
    </div>
  );
};

export default Home;