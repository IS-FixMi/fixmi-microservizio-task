import React from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { prendiInCarico } from "../utils/connection.ts";
import { mettiInPausa } from "../utils/connection.ts";
import { Completa } from "../utils/connection.ts";
import { Riprendi } from "../utils/connection.ts";
export default function TaskDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state.task;
  let additionalContent = null;
  let actionButtons = null;

  const handleClose = () => {
    navigate("../");
  };

  function InCarico(e) {
    console.log(task);
    e.preventDefault(); // Prevent default form submission
    const token = Cookies.get('token');
    prendiInCarico(
      task.taskid,
      token
    )
    .then(response => {
      console.log("Success", response);
    })
    .catch(error => {
      console.error("Request failed", error);
    });
  }

  function Ripresa(e) {
    e.preventDefault(); // Prevent default form submission
    const token = Cookies.get('token');
    Riprendi(
      task.taskid,
      token
    )
    .then(response => {
      console.log("Success", response);
    })
    .catch(error => {
      console.error("Request failed", error);
    });
  }

  function InPausa(e) {
    e.preventDefault(); // Prevent default form submission
    const token = Cookies.get('token');
    mettiInPausa(
      task.taskId,
      token
    )
    .then(response => {
      console.log("Success", response);
    })
    .catch(error => {
      console.error("Request failed", error);
    });
  }

  function Completata(e) {
    e.preventDefault(); // Prevent default form submission
    const token = Cookies.get('token');
    Completa(
      task.taskId,
      token
    )
    .then(response => {
      console.log("Success", response);
    })
    .catch(error => {
      console.error("Request failed", error);
    });
  }

  switch (task.taskStatus) {
    case "Da Eseguire":
      actionButtons = (
        <div className="flex justify-between w-full">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleClose}>Chiudi</button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={InCarico}>Prendi in carico</button>
        </div>
      );
      break;
    case "In Lavorazione":
      actionButtons = (
        <div className="flex justify-between w-full">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleClose}>Chiudi</button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded mx-auto" onClick={InPausa}>Metti in pausa</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded"onClick={Completata}>Completa</button>
        </div>
      );
      break;
    case "Completata":
      actionButtons = (
        <div className="flex justify-start">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleClose}>Chiudi</button>
        </div>
      );
      break;
    case "In Pausa":
      actionButtons = (
        <div className="flex justify-between w-full">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleClose}>Chiudi</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={Ripresa}>Riprendi</button>
        </div>
      );
      break;
    default:
      actionButtons = null;
  }

  switch (task.taskTag) {
    case "Riparazione":
      additionalContent = (
        <div className="text-center space-y-4">
          <div><strong>Nome Richiedente</strong><br />{task.nomeRichiedente}</div>
          <div><strong>Cognome Richiedente</strong><br />{task.cognomeRichiedente}</div>
          <div><strong>Email Richiedente</strong><br />{task.emailRichiedente}</div>
          <div><strong>Telefono Richiedente</strong><br />{task.phoneNumber}</div>
        </div>
      );
      break;
    case "Assistenza":
      additionalContent = (
        <div className="text-center space-y-4">
          <div><strong>Email Richiedente</strong><br />{task.emailRichiedente}</div>
        </div>
      );
      break;
    case "Feedback":
      additionalContent = (
        <div className="text-center space-y-4">
          <div><strong>Idee per Migliorare</strong><br />{task.ideePerMigliorare}</div>
          <div><strong>Disponibilità dell'azienda</strong><br />{task.disponibilitaAzienda}</div>
          <div><strong>Velocità della riparazione</strong><br />{task.velocitaRiparazione}</div>
          <div><strong>Soddisfazione della riparazione</strong><br />{task.soddisfazioneRiparazione}</div>
          <div><strong>Soddisfazione del sito web</strong><br />{task.soddisfazioneSitoWeb}</div>
        </div>
      );
      break;
    default:
      additionalContent = null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-4xl mx-auto relative">
        <div className="p-8 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-4xl font-semibold text-center mb-6 text-gray-800">{task.name}</h3>
            <div className="flex justify-center space-x-4 mb-4">
              <span className={`px-4 py-2 text-sm font-semibold rounded-full ${
                task.taskTag === "Riparazione" ? "bg-blue-200 text-blue-800" :
                task.taskTag === "Assistenza" ? "bg-green-200 text-green-800" :
                task.taskTag === "Feedback" ? "bg-yellow-200 text-yellow-800" :
                task.taskTag === "Negozio" ? "bg-red-200 text-red-800" :
                task.taskTag === "Magazzino" ? "bg-purple-200 text-purple-800" :
                "bg-gray-200 text-gray-800"
              }`}>
                {task.taskTag}
              </span>
              <span className={`px-4 py-2 text-sm font-semibold rounded-full ${
                task.taskStatus === "Da Eseguire" ? "bg-red-200 text-red-800" :
                task.taskStatus === "In Lavorazione" ? "bg-yellow-200 text-yellow-800" :
                task.taskStatus === "Completata" ? "bg-green-200 text-green-800" :
                "bg-gray-200 text-gray-800"
              }`}>
                {task.taskStatus}
              </span>
            </div>
            <p className="text-gray-600 text-center text-xl mb-4">{task.description}</p>
          </div>
          <div className="absolute top-0 right-0 mt-2 mr-2">
            <p className="text-sm text-gray-600">Task ID: {task.taskid}</p>
          </div>
          <div className="mt-4">
            {additionalContent}
          </div>
          <div className="bg-gray-100 p-4 mt-4">
            {actionButtons}
          </div>
        </div>
      </div>
    </div>
  );
}

