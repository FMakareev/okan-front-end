import { createGlobalStyle } from 'styled-components'


export const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
  }
  body, html, #app {
    padding: 0;
    margin: 0;
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
  }
`;
