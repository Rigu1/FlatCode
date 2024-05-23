import styled from 'styled-components';

export const StyledNav = styled.div` 
  display: flex;
  flex-direction: column;
  width: 285px;
  height: 100vh;
  background-color: #161616;
  border-right: 1px solid #333333;

  .logo {    
    padding: 20px;
    height: 90px;
    overflow: hidden;
    img {
      width: 245px; 
      margin-top: -62px; 
    }
  }
`;