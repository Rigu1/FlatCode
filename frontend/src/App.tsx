import React  from 'react';
import { ThemeProvider } from 'styled-components';
import HomePage     from '@pages/HomePage';
import GlobalStyle  from '@styles/GlobalStyles';
import theme        from '@styles/theme'; 

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
        <HomePage />
    </ThemeProvider>
  );
};

export default App;