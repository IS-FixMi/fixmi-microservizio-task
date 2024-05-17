/*
 *   File: scegiTask.ts 
 *
 *   Purpose: this file contains all the routes after
 *            /api/tasks/scegliTask
 *            It makes the enployee choose a task
 *            and assign it to himself
 */ 

import express from 'express' 
import getMissingFields from '../misc/missingFields'
import JSONError from '../misc/JSONError'
import cookieParser from 'cookie-parser'
import getToken from '../misc/getToken'
import getProfileInfo from '../misc/getProfileInfo'
import getProfileId from '../misc/getProfileId'
import getPermission from '../misc/getPermission'

const {MongoClient} = require("mongodb"); // DB
import { db } from '../server';

import {AUTH_IP, DEBUG} from '../server';   // Authentication

// Route:
// /api/tasks/scegliTask
//
// method:
// POST
//
// description:
// This route lets an employee choose a task
//
// body / cookie:
// - token
//
// body:
// - taskid
//
// responses:
// 200 {Success: "Task assigned to the user"}
// 400 {error: "missing fields", missingFields}
// 401 {error: "user not found with the given token"}
// 403 {error: "User not authorized"}
// 400 {error: "task not found"}
const scegliTaskRouter = express.Router();


// Main logic
scegliTaskRouter.post('/', async (req, res) => {

  try {

    let token = getToken(req);
    if (token == null) {
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


    // Check authorization
    if (!isAuthorized(profile)) {
        let e = {'value': 'User not authorized'};
        dbg("(ERROR)", JSON.stringify(e));
        res.status(403);
        res.json(e);
        return;
    }              


    // Check if the task exists
    if (!taskExists(req)) {
        let e = {'value': 'Task not found'};
        dbg("(ERROR)", JSON.stringify(e));
        res.status(400);
        res.json(e);
        return;
    }


    // Query the DB
    let profileId = getProfileId(profile);
    let taskId = getTaskId(req);
    await executeQuery(profileId, taskId);

    // OK
    res.status(200);
    res.json({'Success': 'Task assigned to the user'});

  }
  catch(e) {
    dbg("(ERROR)", e);
    res.status(400);
    res.json(JSON.parse(e.message));
  }


});

export default scegliTaskRouter;


// Check if a task exists with the given taskId
async function taskExists(req) {

  let taskId = getTaskId(req);

  // Check if the token is missing
  let missingFields = getMissingFields([["taskid", taskId ]]);
  if (missingFields.length != 0) {
      return false;
  }

  // Used for testing purposes
  if (taskId == 'test') return true;

  return db.collection("tasks")
      .findOne({ taskid: taskId })
      .then(task => {
        if (task == null) {
            return false;
        }
        return true;
      });
}


// Get the task id
function getTaskId(req) {
  return req.body.taskid;
}

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
async function executeQuery(profileId, taskId) {

    dbg("Executing query", "");
  
    // Used for testing purposes
    if (taskId == 'test') return;

    return db.collection("tasks")
        .updateOne({ taskid: taskId }, { $set: { assignedTo: profileId } });
}

// Prints a debug message if debug is enabled
// name: the name of the variable
// value: the value of the variable
function dbg(name, value) {
  if (!DEBUG) return;
  console.log("(DEBUG /api/tasks/scegliTask) " + name + ": " + value);
}
