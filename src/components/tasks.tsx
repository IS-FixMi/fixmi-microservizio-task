import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";
import Task from "./task";

export default function Tasks() {
  const { showBoundary } = useErrorBoundary();
  const [res, setRes] = useState(null);
  const PORT = 3003;

  useEffect(() => {
    const fetchData = async () => {
      Axios.get(`http://localhost:${PORT}/api/tasks/testDB`)
        .then(
          (response) => {
            setRes(response.data);
          },
          (error) => {
            showBoundary(error);
          }
        );
    };
    fetchData();
  }, []);

  const handleOpenTask = (taskId) => {
    // Perform actions to open the task with taskId
    history.push(`/visualizzaTask/${taskId}`);

  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {res &&
          res.length > 0 &&
          res.map((item) => (
            <div key={item._id} className="rounded-lg overflow-hidden shadow-lg">
              {/* Pass onOpen function to Task component */}
              <Task task={item} onOpen={handleOpenTask} />
            </div>
          ))}
      </div>
    </div>
  );
}

