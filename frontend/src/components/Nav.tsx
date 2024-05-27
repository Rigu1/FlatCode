// src/components/Header.tsx
import { FC } from 'react';
import ImageComponent from '@components/common/ImageComponent'

const Nav: FC = () => {
  return (
    <div className="logo">
      <ImageComponent src="/images/logo_dack.png" alt="Our Company Logo" />
    </div>
  );
};

export default Nav;
