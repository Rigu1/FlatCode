import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@styles/GlobalStyles';
import { theme } from '@styles/theme'; 
import Main from '@components/Main';
import Nav from '@components/Nav';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Main />
      <Nav />
    </ThemeProvider>
  );
};

export default App;