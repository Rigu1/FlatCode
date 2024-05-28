// src/components/Header.tsx
import { FC } from 'react';
import ButtonComponent from '@components/common/ButtonComponent';

interface MainProps {
  mode: string;
  toggleMode: () => void;
}

const Main: FC<MainProps> = ({ mode, toggleMode }) => {
  return (
    <main>
      <div className='main-head'>
        <h1>{mode === 'home' ? 'Home' : 'Edit'}</h1>
        <ButtonComponent 
          text=""
          onClick={toggleMode}
          imageProps={{ src: '/images/add_button.svg', alt: 'button icon' }}
          size='medium'
          hoverEffect='scale'
        />
      </div>
      <div className='main-content'>
        <></>
      </div>
    </main>
  );
};

export default Main;
