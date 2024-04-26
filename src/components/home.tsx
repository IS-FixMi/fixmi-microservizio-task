/*
 *   File: home.tsx 
 *
 *   Purpose: the home screen, rendered when accessing /
 *
 */ 

import React from "react"
import { ErrorBoundary } from 'react-error-boundary'
import '../style.css'
import Navbar from './navbar'
import Map from './map'
import Loremipsum from './loremipsum'
import Team from './team'
import Footer from './footer'

export default function Home() {
  
  // Use the Error Bundary system to catch errors
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <Navbar />
      <ul className="space-y-30 py-36 px-10">
        <Map />
        <Loremipsum />
        <Team />
      </ul>

      <Footer />
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
