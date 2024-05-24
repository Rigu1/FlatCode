import styled from 'styled-components';

export const StyledBoardSet = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em;

  .mainHead {
    display: flex;
    justify-content: space-between;
    margin: 0.5em 0;
  }

  .content {
    display: flex;
    flex-direction: row;
    gap: 1.5em;
    width: 75vw;

  }
`;