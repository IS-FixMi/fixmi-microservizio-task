/*
 *   File: testText.tsx 
 *
 *   Purpose: renders a text on the screen
 *   
 */ 

import React from "react"

import '../style.css'

export default function TestText() {

  return (
    <div className="App text-3xl font-bold underline flex h-screen bg-sky-400">
      <div className="m-auto">
        <p>
          React says: Test component rendered perfectly
        </p>
      </div>
    </div>
  );
}
