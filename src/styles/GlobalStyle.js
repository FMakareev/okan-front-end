import { createGlobalStyle } from 'styled-components';

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

  @font-face {
    font-family: 'Circe Regular';
    src: url('../assets/fonts/Circe-Regular/Circe-Regular.eot');
    src: url('../assets/fonts/Circe-Regular/Circe-Regular.eot?#iefix') format('embedded-opentype'),
    url('../assets/fonts/Circe-Regular/Circe-Regular.woff') format('woff'),
    url('../assets/fonts/Circe-Regular/Circe-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
  font-family: 'Circe Bold';
  src: url('../assets/fonts/Circe-Bold/Circe-Bold.eot');
  src: url('../assets/fonts/Circe-Bold/Circe-Bold.eot?#iefix') format('embedded-opentype'),
  url('../assets/fonts/Circe-Bold/Circe-Bold.woff') format('woff'),
  url('../assets/fonts/Circe-Bold/Circe-Bold.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  }

  @font-face {
  font-family: 'Museo Sans 300 Light';
  src: url('../assets/fonts/Museo/MuseoSansCyrl-300.eot');
  src: url('../assets/fonts/Museo/MuseoSansCyrl-300.eot?#iefix') format('embedded-opentype'),
  url('../assets/fonts/Museo/MuseoSansCyrl-300.woff') format('woff'),
  url('../assets/fonts/Museo/MuseoSansCyrl-300.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

`;

export default GlobalStyle;
