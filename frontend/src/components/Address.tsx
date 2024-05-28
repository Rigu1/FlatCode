import { FC } from 'react';

interface AddressProps {
  userName: string;
  userPicturePath: string;
  userBoardPreset: string;
}

const Address: FC<AddressProps> = ({ userName, userPicturePath, userBoardPreset }) => {
  return (
    <div className="Profile-info">
      <></>
    </div>
  );
};

export default Address;