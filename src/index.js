import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './assets/css/main.css'
import "animate.css"
import { ContextProvider } from './context/Context';

ReactDOM.render(
  <React.StrictMode>
     <ContextProvider>
    <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

