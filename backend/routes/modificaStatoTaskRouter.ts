/*
 *   File: modificastatoTaskRouter.ts 
 *
 *   Purpose: this file contains all the routes after
 *            /api/tasks/modificaStatoTask
 *            It contains the logic to change the status of a task
 *            in the database
 */ 

import express from 'express' 
import getMissingFields from '../misc/missingFields'
import JSONError from '../misc/JSONError'
import cookieParser from 'cookie-parser'
import { TaskStatus } from '../enums/TaskStatus'
import getToken from '../misc/getToken'
import getProfileInfo from '../misc/getProfileInfo'
import getProfileId from '../misc/getProfileId'
import getPermission from '../misc/getPermission'

const {MongoClient} = require("mongodb"); // DB
import { db } from '../server';

import {AUTH_IP, DEBUG} from '../server';   // Authentication

// Route:
// /api/tasks/modificaStatoTask
//
// method:
// POST
//
// description:
// This route lets anyone change the status of a task
//
// body / cookie:
// - token
//
// body:
// - taskid
// - taskStatus
//
// responses:
// 200 {task1, task2, ...}
// 400 {error: "missing fields", missingFields}
// 401 {error: "user not found with the given token"}
// 403 {error: "User not authorized"}
// 400 {error: "Query error"}
// 400 {error: "Task not found"}
const modificaStatoTaskRouter = express.Router();


// Main logic
modificaStatoTaskRouter.post('/', async (req, res) => {

  try {

    let token = getToken(req);
    dbg("Token", token); // qui il token a UNDEFINED DIO LUPO
    if (token === undefined) {
        let e = {'value': 'Missing fields', missingfields: ['token'] };
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


    let taskId = getTaskId(req); 
    let statusVal = getStatus(req);
    let missingFields2 = getMissingFields([["taskid", taskId], ["taskStatus", statusVal]]);
    if (missingFields2.length != 0) {
        let e = {'value': 'Missing fields', missingfields: missingFields2 };
        dbg("(ERROR)", JSON.stringify(e));
        res.status(400);
        res.json(e);
        return;
    }


    // Check if the status is correct
    if (!checkStatus(statusVal)) {
        let e = {'value': 'Wrong status'};
        dbg("(ERROR)", JSON.stringify(e));
        res.status(400);
        res.json(e);
        return;
    }


    // Check if the task exists
    if (! await taskExists(req)) {
        let e = {'value': 'Task not found'};
        dbg("(ERROR)", JSON.stringify(e));
        res.status(400);
        res.json(e);
        return;
    }


    // Query the DB
    let profileId = getProfileId(profile);
    await executeQuery(taskId, statusVal);

    // OK
    res.json({'Success': 'Task status changed successfully'});
  
  }
  catch(e) {
    dbg("(ERROR)", e);
    res.status(400);
    res.json(JSON.parse(e.message));
  }


});

export default modificaStatoTaskRouter;


function getStatus(req) {
   return req.body.taskStatus;
}


// Check if the status is correct
function checkStatus(statusVal) {

  // Check if the status is a value in the enum
  if (!Object.values(TaskStatus).includes(statusVal)) {
      return false;
  }

  return true;
}


// Check if a task exists with the given taskId
async function taskExists(req) {

  let taskId = getTaskId(req);

  // Check if the token is missing
  let missingFields = getMissingFields([["taskid", taskId ]]);
  if (missingFields.length != 0) {
    let e = {'value': 'Missing fields', missingfields: missingFields };
    throw new JSONError(e);
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
async function executeQuery(taskId, statusVal) {

    dbg("Executing query", "");
 
    // Used for testing purposes
    if (taskId == 'test') return;

    return db.collection("tasks")
        .updateOne({ taskid: taskId }, { $set: { taskStatus: statusVal } });
}


// Prints a debug message if debug is enabled
// name: the name of the variable
// value: the value of the variable
function dbg(name, value) {
  if (!DEBUG) return;
  console.log("(DEBUG /api/tasks/modificaStatoTask) " + name + ": " + value);
}
