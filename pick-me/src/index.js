import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import "./index.css";

import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import store from "./redux/store";
import theme from './theme';

const root = document.getElementById('root'); // take root
const container = createRoot(root); // create root

container.render(
  <React.StrictMode>
    <Provider store={store} >
      <ThemeProvider theme={theme} >
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);