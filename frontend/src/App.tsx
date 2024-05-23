import React from 'react';
import { ThemeProvider } from 'styled-components';
import HomePage from '@pages/HomePage';
import GlobalStyle from '@styles/styled-component/GlobalStyles';
import theme from '@styles/styled-component/theme'; 

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
        <HomePage />
    </ThemeProvider>
  );
};

export default App;