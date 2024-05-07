/*
 *   File: App.ts 
 *
 *   Purpose: this file contains the parent of all components
 *
 */ 

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import Home from './components/home'

function App() {

  return (
    <BrowserRouter>
      <main>
          <Routes>
            {/* Routing */}
            <Route path="/" element={<Home />}/>
            <Route path="*" element={<Home />}/>
          </Routes>
      </main>

    </BrowserRouter>
  );

}

export default App;

