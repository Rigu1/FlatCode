import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
    color: #fff;
    background-color: #181818; /* Optional: to ensure consistent background color */
  }

  * {
    box-sizing: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }

  button {
    padding: 10px 20px;
    margin: 5px 0;
    border: none;
    border-radius: 5px;
    background-color: #222;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    
    &:hover {
      background-color: #333;
    }
  }
    

  input[type="text"] {
    padding: 10px;
    margin: 5px 0;
    border: none;
    border-radius: 5px;
    background-color: #333;
    color: #fff;
    font-size: 16px;
  }
`;

export default GlobalStyle;
