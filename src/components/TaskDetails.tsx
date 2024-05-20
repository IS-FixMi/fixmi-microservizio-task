import React from "react";
import { useLocation } from "react-router-dom";

export default function TaskDetails() {
  const location = useLocation();
  const task = location.state.task;

  // Now you can use the task object as needed
  return (
    <div>
      <h2>{task.taskName}</h2>
      {/* Render other details of the task */}
    </div>
  );
}

