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
console.log(typeFilter);
  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('token');
      if (token == undefined ) {
        window.location.href="/auth";
	return;
      }
      let apiCall;
      switch (statusFilter) {
        case 'Da Eseguire':
          apiCall = getTaskDaEseguire;
          break;
        case 'Completata':
          apiCall = getStoricoTask;
          break;
        case 'In Pausa':
          apiCall = getTaskInPausa;
          break;
        case 'In Lavorazione':
          apiCall = getTaskInLavorazione;
          break;
        default:
          apiCall = getTaskDaEseguire;
          break;
      }

      fetch(apiCall(token))
        .then(async (response) => {
            console.log(response.status);
            if(response.status === 200){
              const body = await response.json();
              setRes(body);
            }else{
              showBoundary(await response.json());
            }
	})
	.catch((error) => {
           showBoundary(error);
	});

    fetchData();
  }, [statusFilter, showBoundary, navigate]);

  const handleOpenTask = (task) => {
    navigate("/task-details", { state: { task } });

  return (
    <div>
      <SearchBar onTypeFilter={setTypeFilter} onStatusFilter={setStatusFilter} />
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {res.length > 0 ? (
            res.map((item) => (
              <div key={item._id} className="rounded-lg overflow-hidden shadow-lg">
                <Task task={item} onOpen={() => handleOpenTask(item)} />
              </div>
            ))
          ) : (
            <p>No tasks found</p>
          )}
        </div>
      </div>
    </div>
  );
}

