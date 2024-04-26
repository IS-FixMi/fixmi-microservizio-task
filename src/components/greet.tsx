/*
 *   File: greet.tsx 
 *
 *   Purpose: the greet component, It makes a call to the
 *            backend at /api/greet and displays the message 
 *            on screen
 *
 */ 

import React from "react"
import { ErrorBoundary } from 'react-error-boundary'
import GreetText from './greetText'
import '../style.css'


export default function Greet() {
  
  // Use the Error Bundary system to catch errors
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <GreetText />
    </ErrorBoundary>
  );
}

export function Fallback({ error }) {
    
  // This is important, don't delete it
  console.error(error)

  return (
    <div>
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}
