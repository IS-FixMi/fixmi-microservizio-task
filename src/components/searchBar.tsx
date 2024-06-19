import React, { useState } from 'react';

export default function SearchBar({ onTypeFilter, onStatusFilter }) {
  const [selectedTaskType, setSelectedTaskType] = useState('Tutti');
  const [selectedStatus, setSelectedStatus] = useState('Tutti');

  const handleTypeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedTaskType(selectedValue);
    onTypeFilter(selectedValue);
  };

  const handleStatusChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedStatus(selectedValue);
    onStatusFilter(selectedValue);
  };

  return (
    <div className="flex justify-center py-8">
      <div className="w-full max-w-lg md:w-auto flex items-center space-x-4">
        <select
          value={selectedTaskType}
          onChange={handleTypeChange}
          className="block w-auto py-2 pl-3 pr-10 text-base border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="Tutti">Tutte le tasks</option>
          <option value="Assistenza">Assistenza</option>
          <option value="Feedback">Feedback</option>
          <option value="Riparazione">Riparazione</option>
          <option value="Negozio">Negozio</option>
          <option value="Magazzino">Magazzino</option>
        </select>
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="block w-auto py-2 pl-3 pr-10 text-base border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="Tutti">Tutti gli stati</option>
          <option value="Completata">Completato</option>
          <option value="In Lavorazione">In Lavorazione</option>
          <option value="Da Eseguire">Da Eseguire</option>
          <option value="In Pausa">In Pausa</option>
        </select>
      </div>
    </div>
  );
}

