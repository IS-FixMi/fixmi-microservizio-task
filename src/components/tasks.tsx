import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import { getTaskDaEseguire, getStoricoTask, getTaskInPausa, getTaskInLavorazione } from "../utils/connection.ts";
import Task from "./task";
import SearchBar from "./searchBar";

export default function Tasks() {
  const { showBoundary } = useErrorBoundary();
  const [res, setRes] = useState([]);
  const [typeFilter, setTypeFilter] = useState("Tutti");
  const [statusFilter, setStatusFilter] = useState("Tutti");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      const token = Cookies.get('token');
      if (token === undefined) {
        window.location.href = "/auth";
        return;
      }

      const apiCalls = [];
      switch (statusFilter) {
        case 'Da Eseguire':
          apiCalls.push(getTaskDaEseguire(token));
          break;
        case 'Completata':
          apiCalls.push(getStoricoTask(token));
          break;
        case 'In Pausa':
          apiCalls.push(getTaskInPausa(token));
          break;
        case 'In Lavorazione':
          apiCalls.push(getTaskInLavorazione(token));
          break;
        case 'Tutti':
          apiCalls.push(
            getTaskDaEseguire(token),
            getStoricoTask(token),
            getTaskInPausa(token),
            getTaskInLavorazione(token)
          );
          break;
        default:
          apiCalls.push(
            getTaskDaEseguire(token),
            getStoricoTask(token),
            getTaskInPausa(token),
            getTaskInLavorazione(token)
          );
         break;
      }

      // Execute all API calls concurrently using Promise.all
      Promise.all(apiCalls.map(call => fetch(call)))
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(results => {
          const mergedResults = results.reduce((acc, curr) => acc.concat(curr), []); // Merge results into a single array
          setRes(mergedResults); // Update state with merged results
        })
        .catch(error => {
          showBoundary(error);
        });
    };

    fetchData();
  }, [statusFilter, typeFilter]);

  const handleOpenTask = (task) => {
    navigate("/task-details", { state: { task } });
  };

  return (
    <div>
      <SearchBar onTypeFilter={setTypeFilter} onStatusFilter={setStatusFilter} />
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {res.length > 0 ? (
            res.map((item) => {
              // Check if task type matches selected type filter
              if (typeFilter === "Tutti" || item.taskTag === typeFilter) {
                return (
                  <div key={item._id} className="rounded-lg overflow-hidden shadow-lg">
                    <Task task={item} onOpen={() => handleOpenTask(item)} />
                  </div>
                );
              }
              return null; // Render nothing if task type doesn't match
            })
          ) : (
            <p>No tasks found</p>
          )}
        </div>
      </div>
    </div>
  );
}

