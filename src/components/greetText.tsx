/*
 *   File: greetText.tsx 
 *
 *   Purpose: returns a component with the greet text
 *            by calling the api /api/greet
 *
 */ 

import Axios from "axios"
import React, {useState, useEffect} from "react"
import { useErrorBoundary } from "react-error-boundary";
import '../style.css'

export default function GreetText() {

  // Use the Error Bundary handling
  const { showBoundary } = useErrorBoundary()
  // Introduce state to the component
  // The initial state is an empty list
  const [res, setRes] = useState([])

  const PORT = process.env.REACT_APP_BACKEND_PORT || 3001;

  // Call api
  useEffect(() => {
     const fetchData = async () => {
        Axios.get('http://localhost:'.concat(PORT, "/api/greet"))
            .then(
              response => {
                setRes(response.data)
              },
              error => {
                showBoundary(error)
            })
      }
      
      fetchData()
  }, [])

  return (
      <div className="App text-3xl font-bold underline flex h-screen bg-sky-400">
      <div className="m-auto">
        <p>
          React says: {res.text}
        </p>
      </div>
    </div>
  );


}
