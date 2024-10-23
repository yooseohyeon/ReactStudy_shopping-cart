import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @font-face {
      font-family: 'Pretendar-Regular';
      src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
  }

  /* Reset */
  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  ul, ol, li, dl, dt, dd {
      list-style-type: none;
      padding-left: 0;
      margin-left: 0;
  }

  a {
      color: inherit;
  }

  button {
      border: none;
      cursor: pointer;
      font-family: 'Pretendar-Regular', sans-serif;
  }

  button:focus,
  button:active,
  input:focus,
  input:active {
      outline: none;
      box-shadow: none;
  }

  * {
    box-sizing: border-box;
  }

  body {
    padding: 30px;
    font-family: 'Pretendar-Regular';
  }

  h1 {
    margin-bottom: 20px;
  }
`;