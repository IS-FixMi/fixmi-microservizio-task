/*
 *   File: getlistaTaskDaEseguireRouter.ts 
 *
 *   Purpose: this file contains all the routes after
 *            /api/tasks/getListaTaskDaEseguire
 *            It returns all the tasks in the database
 *            that are yet to be executed
 *
 */ 

import express from 'express' 
import getMissingFields from '../misc/missingFields'
import JSONError from '../misc/JSONError'
import cookieParser from 'cookie-parser'
import getToken from '../misc/getToken'
import getProfileInfo from '../misc/getProfileInfo'

const {MongoClient} = require("mongodb"); // DB
import { db } from '../server';

import {AUTH_IP, DEBUG} from '../server';   // Authentication

// Route:
// /api/tasks/getListaTaskDaEseguire
//
// method:
// POST
//
// description:
// returns all the tasks in the database that are yet to be executed
//
// body / cookie:
// token
//
// responses:
// 200 {task1, task2, ...}
// 400 {error: "missing fields", missingFields}
// 401 {error: "user not found with the given token"}
// 403 {error: "User not authorized"}
const getListaTaskDaEseguireRouter = express.Router();


// Main logic
getListaTaskDaEseguireRouter.post('/', async (req, res) => {

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


    // Check authorization
    if (!isAuthorized(profile)) {
        let e = {'value': 'User not authorized'};
        dbg("(ERROR)", JSON.stringify(e));
        res.status(403);
        res.json(e);
        return;
    }              


    // Query the DB
    let allTasks = await executeQuery();
    if (allTasks === null) {
       let e = {'value': 'Query error'};
       dbg("(ERROR)", JSON.stringify(e));
       res.status(400);
       res.json(e);
       return;
    }


    dbg("AllTasks", JSON.stringify(allTasks));
    
    // OK
    // Return the tasks
    res.status(200);
    res.json(allTasks);
    
  }
  catch(e) {
    dbg("(ERROR)", e);
    res.status(400);
    res.json(e.message);
  }


});

export default getListaTaskDaEseguireRouter;


// Check if the user is authorized
function isAuthorized(profile) {

  dbg("Profile", JSON.stringify(profile));
   
  let permission = profile.user_info.permission;
  dbg("Permission", permission);

  if (permission != 'Manager' &&
      permission != 'Dipendente') {
    return false;
  }

  return true;
}


// Query the DB
async function executeQuery() {

    dbg("Executing query", "");
    
    return db.collection("tasks")
        .find({ "taskStatus": 'Da Eseguire' })
        .toArray();
}

// Prints a debug message if debug is enabled
// name: the name of the variable
// value: the value of the variable
function dbg(name, value) {
  if (!DEBUG) return;
  console.log("(DEBUG /api/tasks/getListaTaskDaEseguire) " + name + ": " + value);
}
