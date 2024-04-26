/*
 *   File: index.tsx 
 *
 *   Purpose: this file generates the root react component,
 *            rendering App
 *
 */ 

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

