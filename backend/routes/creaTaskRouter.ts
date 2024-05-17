/*
 *   File: creaTaskRouter.ts 
 *
 *   Purpose: this file contains all the routes after
 *            /api/tasks/creaTask
 *            It contains the logic to create a task
 *            and store it in the database
 */ 

import express from 'express' 
import getMissingFields from '../misc/missingFields'
import JSONError from '../misc/JSONError'
import cookieParser from 'cookie-parser'
import { TaskTag } from '../enums/TaskTag'
import getToken from '../misc/getToken'
import getProfileInfo from '../misc/getProfileInfo'

import Task from '../classes/Task';
import TaskRiparazione from '../classes/TaskRiparazione';
import TaskAssistenza from '../classes/TaskAssistenza';
import TaskFeedback from '../classes/TaskFeedback';
import TaskNegozio from '../classes/TaskNegozio';
import TaskMagazzino from '../classes/TaskMagazzino';

const {MongoClient} = require("mongodb"); // DB
import { db } from '../server';

import {AUTH_IP, DEBUG} from '../server';   // Authentication

// Route:
// /api/tasks/creaTask
//
// method:
// POST
//
// description:
// This route lets anyone create a task
//
// body / cookie:
// token
//
// body:
// - nome
// - descrizione
// - taskTag
// - taskStatus
// - TaskAssistenza:
//   - emailRichiedente
// - TaskFeedback:
//   - ideePerMigliorare
//   - disponibilitaAzienda
//   - velocitaRiparazione
//   - soddisfazioneRiparazione
//   - soddisfazioneSitoWeb
// - TaskRiparazione:
//   - nomeRichiedente
//   - cognomeRichiedente
//   - emailRichiedente
//   - images (not supported now)
//   - numeroTelefono
// 
// responses:
// 200 {task1, task2, ...}
// 400 {error: "missing fields", missingFields}
// 401 {error: "User not found with the given token"}
const creaTaskRouter = express.Router();


// Main logic
creaTaskRouter.post('/', async (req, res) => {

  try {

    let token = getToken(req);
    if (token === undefined) {
        let e = {'value': 'Missing fields', missingfields: ['token']};
        dbg("(ERROR)", JSON.stringify(e));
        res.status(400);
        res.json(e);
        return;
    }


    // Check authentication
    let profile = await getProfileInfo(token);
    if (profile === null) {
        let e = {'value': 'User not found with the given token'};
        dbg("(ERROR)", JSON.stringify(e));
        res.status(401);
        res.json(e);
        return;
    }

    let taskTag = getTaskTag(req);
    // Get the task
    let task = getTask(req, taskTag);

    dbg("Task", JSON.stringify(task.toJSON()));


    // Query the DB
    executeQuery(task).then(ret => {

    // OK
    dbg("DB response", JSON.stringify(ret));
    res.status(200); 
    res.json({'Success': 'Task created'});
    
    // Errors
    }).catch(e => { 
      // DB error
      dbg("(ERROR)", e);
      res.status(400);
      res.json(JSON.parse(e.message));
    });
  }
  catch(e) {
    // Missing fields
    dbg("(ERROR)", e);
    res.status(400);
    res.json(JSON.parse(e.message));
  }


});

export default creaTaskRouter;


// This function returns the task tag from the request
function getTaskTag(req) : TaskTag {

  let taskTagString = req.body.taskTag;

  dbg("TaskTag", taskTagString);

  // Check if the tasktag is missing
  let missingFields = getMissingFields([["taskTag", taskTagString]]);
  if (missingFields.length != 0) {
    let e = {'value': 'Missing fields', missingfields: missingFields };
    throw new JSONError(e);
  }

  if (!Object.values(TaskTag).includes(taskTagString as TaskTag)) {
    let e = {'value': 'Invalid taskTag', 'taskTag': taskTagString};
    throw new JSONError(e);
  }
  
  let taskTag = taskTagString as TaskTag;
  return taskTag;
}

function getTask(req, taskTag: TaskTag): Task {

  let missingFields = [];
  switch(taskTag) {
    case TaskTag.Assistenza:

        missingFields = getMissingFields([
                ["nome", req.body.nome],
                ["descrizione", req.body.descrizione],
                ["emailRichiedente", req.body.emailRichiedente]
        ]);

        if (missingFields.length != 0) {
          let e = {'value': 'Missing fields', missingfields: missingFields };
          throw new JSONError(e);
        }

        return new TaskAssistenza(req.body.nome,
                                  req.body.descrizione,
                                  req.body.emailRichiedente);
        break;

    case TaskTag.Feedback:

        missingFields = getMissingFields([
                ["nome", req.body.nome],
                ["descrizione", req.body.descrizione],
                ["ideePerMigliorare", req.body.ideePerMigliorare],
                ["disponibilitaAzienda", req.body.disponibilitaAzienda],
                ["velocitaRiparazione", req.body.velocitaRiparazione],
                ["soddisfazioneRiparazione", req.body.soddisfazioneRiparazione],
                ["soddisfazioneSitoWeb", req.body.soddisfazioneSitoWeb]
        ]);

        if (missingFields.length != 0) {
          let e = {'value': 'Missing fields', missingfields: missingFields };
          throw new JSONError(e);
        }

        return new TaskFeedback(req.body.nome,
                                  req.body.descrizione,
                                  req.body.ideePerMigliorare,
                                  req.body.disponibilitaAzienda,
                                  req.body.velocitaRiparazione,
                                  req.body.soddisfazioneRiparazione,
                                  req.body.soddisfazioneSitoWeb);
        break;

    case TaskTag.Magazzino:

        missingFields = getMissingFields([
                ["nome", req.body.nome],
                ["descrizione", req.body.descrizione],
        ]);

        if (missingFields.length != 0) {
          let e = {'value': 'Missing fields', missingfields: missingFields };
          throw new JSONError(e);
        }

        return new TaskMagazzino(req.body.nome,
                                  req.body.descrizione);
        break;

    case TaskTag.Negozio:

        missingFields = getMissingFields([
                ["nome", req.body.nome],
                ["descrizione", req.body.descrizione],
        ]);

        if (missingFields.length != 0) {
          let e = {'value': 'Missing fields', missingfields: missingFields };
          throw new JSONError(e);
        }

        return new TaskNegozio(req.body.nome,
                                  req.body.descrizione);
        break;

    case TaskTag.Riparazione:

        missingFields = getMissingFields([
                ["nome", req.body.nome],
                ["descrizione", req.body.descrizione],
                ["nomeRichiedente", req.body.nomeRichiedente],
                ["cognomeRichiedente", req.body.cognomeRichiedente],
                ["emailRichiedente", req.body.emailRichiedente],
                ["phoneNumber", req.body.numeroTelefono]
        ]);

        if (missingFields.length != 0) {
          let e = {'value': 'Missing fields', missingfields: missingFields };
          throw new JSONError(e);
        }

        return new TaskRiparazione(req.body.nome,
                                   req.body.descrizione,
                                   req.body.nomeRichiedente,
                                   req.body.cognomeRichiedente,
                                   req.body.emailRichiedente,
                                   req.body.numeroTelefono);
        break;

  }

      
}

// Query the DB
async function executeQuery(task) {

    dbg("Executing query", "");
   
    // Used for testing purposes
    if (task.getName() == 'justatest') return;

    return db.collection("tasks")
        .insertOne(task.toJSON());
}

// Prints a debug message if debug is enabled
// name: the name of the variable
// value: the value of the variable
function dbg(name: String, value: String) {
  if (!DEBUG) return;
  console.log("(DEBUG /api/tasks/creaTask) " + name + ": " + value);
}
