import React from "react";
import { useLocation } from "react-router-dom";

export default function TaskDetails() {
  const location = useLocation();
  const task = location.state.task;

  let additionalContent = null;

  switch (task.taskTag) {
    case "Riparazione":
      additionalContent = (<div>
        <div>Nome del figlio di troia: {task.nomeRichiedente}</div>
	<div>Cognome: {task.cognomeRichiedente}</div>
	<div>telefono: {task.phoneNumber}</div>
      </div>
      );
      break;
    case "Assistenza":
      additionalContent = <div>Additional content for Assistenza task</div>;
      break;
    // Add more cases as needed for other task tags
    default:
      additionalContent = null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full h-full max-w-6xl max-h-4xl mx-auto">
        <div className="p-8 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-5xl font-semibold text-center mb-6 text-gray-800">{task.name}</h3>
            <p className="text-gray-600 text-center text-xl mb-4">{task.description}</p>
            <div className="flex justify-center space-x-4 mb-4">
              <span
                className={`px-4 py-2 text-sm font-semibold rounded-full ${
                  task.taskTag === "Riparazione"
                    ? "bg-blue-200 text-blue-800"
                    : task.taskTag === "Assistenza"
                    ? "bg-green-200 text-green-800"
                    : task.taskTag === "Feedback"
                    ? "bg-yellow-200 text-yellow-800"
                    : task.taskTag === "Negozio"
                    ? "bg-red-200 text-red-800"
                    : task.taskTag === "Magazzino"
                    ? "bg-purple-200 text-purple-800"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {task.taskTag}
              </span>
              <span
                className={`px-4 py-2 text-sm font-semibold rounded-full ${
                  task.taskStatus === "Da Eseguire"
                    ? "bg-red-200 text-red-800"
                    : task.taskStatus === "In Lavorazione"
                    ? "bg-yellow-200 text-yellow-800"
                    : task.taskStatus === "Completata"
                    ? "bg-green-200 text-green-800"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {task.taskStatus}
              </span>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <p className="text-sm text-gray-600">Task ID: {task.taskid}</p>
          </div>
          {additionalContent}
        </div>
      </div>
    </div>
  );
}

