/*
 *   File: tasks.tsx 
 *
 *   Purpose: Call the api for the tasks list
 *            render each task using the "task.tsx" component 
 *           
 *
 */ 

import Axios from "axios"
import React, {useState, useEffect} from "react"
import { useErrorBoundary } from "react-error-boundary";
import '../style.css'
import Task from "./task";
//import SearchBar from "./searchbar"

export default function Tasks() {

  // Use the Error Bundary handling
  const { showBoundary } = useErrorBoundary()
  // Introduce state to the component
  // The initial state is an empty list
  const [res, setRes] = useState(null)

  const PORT = 3003;
  
  //BISOGNA AGGIUSTARE LA RIGA SOTTO!1!1!1!!
  //const PORT = process.env.REACT_APP_BACKEND_PORT || 3003;
  
  // Call api
  useEffect(() => {
    const fetchData = async () => {
      Axios.get('http://localhost:'.concat(PORT, "/api/testDB"))
      .then(
        response => {
          setRes(response.data)
        },
        error => {
          showBoundary(error)
        }
      )
    }
    fetchData()
  }, [])

return (
<span>
{/*}
<div className="py-5">
<SearchBar/>
</div>
*/}
<div className="flex flex-wrap center justify-center items-center bg-white">
{res && res.length > 0 && (
      res.map((item) => (
            <span className="py-5 px-12">
               <Task task={item} />
            </span>
      ))
    )}
</div>
</span>
);



}
