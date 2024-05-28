// src/components/Header.tsx
import { FC } from 'react';
import Address from '@components/Address'
import ImageComponent from '@components/common/ImageComponent'
interface NavProps {
  mode: string;
}

const Nav: FC<NavProps> = ({ mode }) => {
  return (
    <nav>
      <div className="logo">
        <ImageComponent src='/images/logo_dack.png' alt='logo icon' />
      </div>
      {mode === 'home' ? (
        <></>
      ) : (
        <></>
      )}
      <Address />
    </nav>
  );
};

export default Nav;
