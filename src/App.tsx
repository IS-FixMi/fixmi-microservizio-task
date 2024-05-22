import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import VisualizzaTask from './components/visualizzaTask';
import TaskDetails from './components/TaskDetails.tsx';

function App() {
  return (
    <BrowserRouter basename='tasks/'>
      <main>
        <Routes>
          {/* Routing */}
          <Route path="/" element={<VisualizzaTask />} />
          <Route path="task-details" element={<TaskDetails />} />
          <Route path="*" element={<VisualizzaTask />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

