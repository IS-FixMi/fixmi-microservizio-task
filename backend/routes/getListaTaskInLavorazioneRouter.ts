/*
 *   File: getlistaTaskInLavorazioneRouter.ts 
 *
 *   Purpose: this file contains all the routes after
 *            /api/tasks/getListaTaskInLavorazione
 *            It returns all the tasks in the database
 *            that are in progress
 *
 */ 

import express from 'express' 
import getMissingFields from '../misc/missingFields'
import JSONError from '../misc/JSONError'
import cookieParser from 'cookie-parser'
import getToken from '../misc/getToken'
import getProfileInfo from '../misc/getProfileInfo'
import getPermission from '../misc/getPermission'
import getProfileId from '../misc/getProfileId'


const {MongoClient} = require("mongodb"); // DB
import { db } from '../server';

import {AUTH_IP,DEBUG} from '../server';   // Authentication


// Allow debug prints
const debug = true;

// Route:
// /api/tasks/getListaTaskInLavorazione
//
// method:
// POST
//
// description:
// returns all the tasks in the database that are in progress
//
// body / cookie:
// token
//
// responses:
// 200 {task1, task2, ...}
// 400 {error: "missing fields", missingFields}
// 401 {error: "user not found with the given token"}
// 403 {error: "User not authorized"}
// 400 {error: "Query error"}
const getListaTaskInLavorazioneRouter = express.Router();


// Main logic
getListaTaskInLavorazioneRouter.post('/', async (req, res) => {

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
    if (profile == null) {
        let e = {'value': 'User not found with the given token'};
        dbg("(ERROR)", JSON.stringify(e));
        res.status(401);
        res.json(e);
        return;
    }


    // Get the profile id
    let profileId = getProfileId(profile);
    let permission = getPermission(profile);


    // Check authorization
    if (!isAuthorized(profile)) {
        let e = {'value': 'User not authorized'};
        dbg("(ERROR)", JSON.stringify(e));
        res.status(403);
        res.json(e);
        return;
    }              


    // Query the DB
    let allTasks = await executeQuery(profileId, permission);
    if (allTasks == null) {
       let e = {'value': 'Query error'};
       dbg("(ERROR)", e);
       res.status(400);
       res.json(e);
       return;
    }


    dbg("AllTasks", JSON.stringify(allTasks));
    
    // OK
    // Return the tasks
    res.json(allTasks);

  }
  catch(e) {
    dbg("(ERROR)", e);
    res.status(400);
    res.json(JSON.parse(e.message));
  }


});

export default getListaTaskInLavorazioneRouter;


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
async function executeQuery(profileId, permission) {

    dbg("Executing query", "");
   
    // The manager can see all the tasks in lavorazione
    if (permission == 'Manager') {
    
      return db.collection("tasks")
          .find({ taskStatus: 'In Lavorazione' })
          .toArray();
    }

    return db.collection("tasks")
        .find({ 'taskStatus': 'In Lavorazione', 'assignedTo': profileId })
        .toArray();
}

// Prints a debug message if debug is enabled
// name: the name of the variable
// value: the value of the variable
function dbg(name, value) {
  if (!DEBUG) return;
  console.log("(DEBUG /api/tasks/getListaTaskInLavorazione) " + name + ": " + value);
}
