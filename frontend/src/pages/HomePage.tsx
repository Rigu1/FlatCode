import React from 'react';
import Dashboard from '@components/Dashboard';
import Board from '@components/Board';
import ImageComponent from '@components/common/ImageComponent';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const StyledHomePage = styled.div`
  .container {
    display: flex;
    background-color: #181818;
  }

  nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 280px;
    height: 100vh;
    border-right: solid 1px #666;

    .logo-img {
      width: 160px;
    }
  }

  main {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    .main-head {
    }

    .main-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 20px;
    }
  }
`;

const HomePage: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <StyledHomePage>
        <div className="container">
          <nav>
            <ImageComponent
              src="/images/logo_dack.png"
              alt="logo"
              className="logo-img"
            />
            <div className="Dashboard">
              <h4>Dashboard</h4>
              <Dashboard />
            </div>
          </nav>
          <main>
            <div className="main-content">
              <Board />
            </div>
          </main>
        </div>
      </StyledHomePage>
    </DndProvider>
  );
};

export default HomePage;
