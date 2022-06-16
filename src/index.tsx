import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
body {
  background-color: #203d4a;
  -webkit-font-smoothing: antialiased;
}
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);