import React from 'react';
import Dashboard from '@components/Dashboard';
import Board from '@components/Board';
import ImageComponent from '@components/common/ImageComponent';
import styled from 'styled-components';

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
    }
  }
`;

const HomePage: React.FC = () => {
  return (
    <StyledHomePage>
      <div className="container">
        <nav>
          <ImageComponent
            src="/images/logo_dack.png"
            alt="logo"
            className="logo-img"
          />
          <div className="Dashboard">
            <h4>Main</h4>
            <Dashboard />
          </div>
        </nav>
        <main>
          <div className="main-head"></div>
          <div className="main-content">
            <Board />
          </div>
        </main>
      </div>
    </StyledHomePage>
  );
};

export default HomePage;
