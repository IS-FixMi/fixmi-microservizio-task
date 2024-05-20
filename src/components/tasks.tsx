import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Task from "./task";
import SearchBar from "./searchBar";

export default function Tasks() {
  const { showBoundary } = useErrorBoundary();
  const [res, setRes] = useState([]);
  const [typeFilter, setTypeFilter] = useState("Tutti");
  const [statusFilter, setStatusFilter] = useState("Tutti");
  const PORT = 3003;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`http://localhost:${PORT}/api/tasks/testDB`);
        setRes(response.data);
      } catch (error) {
        showBoundary(error);
      }
    };
    fetchData();
  }, []);

  const handleOpenTask = (task) => {
    // Redirect to the target page and pass the task object as state
    return (
      <Link to={{
        pathname: "/task-details", // Specify your target route here
        state: { task: task } // Pass the task object as state
      }} />
    );
  };

  // Filter the tasks based on the selected filters
  const filteredTasks = res.filter(item =>
    (typeFilter === "Tutti" || item.taskTag === typeFilter) &&
    (statusFilter === "Tutti" || item.taskStatus === statusFilter)
  );

  return (
    <div>
      <div>
        <SearchBar onTypeFilter={setTypeFilter} onStatusFilter={setStatusFilter} />
      </div>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredTasks.length > 0 && filteredTasks.map((item) => (
            <div key={item._id} className="rounded-lg overflow-hidden shadow-lg">
              {/* Call handleOpenTask when task is clicked */}
                <Task task={item} onOpen={handleOpenTask} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

