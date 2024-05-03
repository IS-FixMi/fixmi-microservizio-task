
/*
 *   File: testTaskRouter.ts 
 *
 *   Purpose: this file contains all the routes after
 *            /api/tasks/testTask
 *            It is used to test the all Task classes
 *            and their methods by creating a test Task
 *            for each type and printing it to the console
 *
 */ 

import express from 'express' 
import TaskRiparazione from '../classes/TaskRiparazione';
import TaskAssistenza from '../classes/TaskAssistenza';
import TaskFeedback from '../classes/TaskFeedback';
import TaskNegozio from '../classes/TaskNegozio';
import TaskMagazzino from '../classes/TaskMagazzino';

// Create a test Task for each type
const taskRiparazione = new TaskRiparazione('Task1',
                'Description1', 'Da Eseguire', 1,
                'Mario', 'Rossi', 'email@email.com',
                '3334445566');

const taskAssistenza = new TaskAssistenza('Task2',
                'Description2', 'In lavorazione', 2,
                'email@email.com');

const taskFeedback = new TaskFeedback('Task3',
                'Description3', 'Completata', 3,
                'Idea', 'disponibilissimo', 'velocissimo',
                'soddisfattissimo', 'soddisfattissimo');

const taskNegozio = new TaskNegozio('Task4',
                'Description4', 'In lavorazione', 4);

const taskMagazzino = new TaskMagazzino('Task5',
                'Description5', 'Completata', 5);

// '/api/greet'
const testTaskRouter = express.Router();

// GET route
testTaskRouter.get('/', (req, res) => {

  taskRiparazione.printTask();
  taskAssistenza.printTask();
  taskFeedback.printTask();
  taskNegozio.printTask();
  taskMagazzino.printTask();

  res.json(taskMagazzino.toJSON());
});

export default testTaskRouter;
