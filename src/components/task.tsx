import React from "react";

export default function Task({ task, onOpen }) {
  const handleOpenClick = () => {
    onOpen(task);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="p-6 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{task.name}</h3>
          <p className="text-gray-600 mb-2">{task.description}</p>
          <div className="flex justify-between items-center">
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${
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
              className={`px-3 py-1 text-sm font-semibold rounded-full ${
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
        <div className="mt-4 flex justify-between items-center">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={handleOpenClick}
          >
            Apri
          </button>
          <p className="text-xs text-gray-600">ID: {task.taskid}</p>
        </div>
      </div>
    </div>
  );
}

