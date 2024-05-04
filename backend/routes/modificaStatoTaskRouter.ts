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
// 400 {error: "user not found with the given token"}
// 400 {error: "User not authorized"}
// 400 {error: "task not found"}
// 400 {error: "Wrong status"}
const modificaStatoTaskRouter = express.Router();


// Main logic
modificaStatoTaskRouter.post('/', async (req, res) => {

  try {

    let token = getToken(req);


    // Check authentication
    getProfileInfo(token).then(profile => {


    // Check if the status is correct
    let statusVal = checkStatus(req);


    // Check authorization
    if (!isAuthorized(profile)) {
        let e = {'value': 'User not authorized'};
        throw new JSONError(e);
    }              


    // Check if the task exists
    taskExists(req).then(task => {



    // Query the DB
    let profileId = getProfileId(profile);
    let taskId = getTaskId(req);
    executeQuery(taskId, statusVal).then(ret => {

    // OK
    res.status(200);
    res.json({'Success': 'Task status changed successfully'});

    // Errors
    }).catch(e => { 
      // DB error
      dbg("(ERROR)", e);
      res.status(400);
      res.json(JSON.parse(e.message));
    });}).catch(e => {
      // task not found
      res.status(400);
      res.json(JSON.parse(e.message));
    });}).catch(e => {
      // user not authenticated
      dbg("(ERROR)", e);
      res.status(400);
      res.json(JSON.parse(e.message));
    });
  
  }
  catch(e) {
    // Missing fields / user not authorized / wrong status
    dbg("(ERROR)", e);
    res.status(400);
    res.json(JSON.parse(e.message));
  }


});

export default modificaStatoTaskRouter;


// This function returns the token from the request
function getToken(req) {

  let token;

  // getting the token from the request body
  token = req.body.token;
  dbg("Token", token);

  if (token == undefined) {
    // getting the token from the cookie
    dbg("Cookies", cookieParser.JSONCookie(req.cookies));
    token = req.cookies.token;
  }

  // Check if the token is missing
  let missingFields = getMissingFields([["token", token]]);
  if (missingFields.length != 0) {
    let e = {'value': 'Missing fields', missingfields: missingFields };
    throw new JSONError(e);
  }

  return token;
}


// This function returns the profile info from the authentication microservice
async function getProfileInfo(token) {

  // Preparing the query for the authentication microservice
  const formData = new URLSearchParams();
  formData.append('token', token);
  const authentication_url = "http://"      // protocol
                             + AUTH_IP +    // ip
                             ":3001" +      // port
                             "/api/auth/authenticate"; // path

  // Fetching the profile info
  return await fetch(authentication_url, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString()
  }).then(response => {

  if(!response.ok) {
    let e = {'value': 'User not found with the given token'};
    throw new JSONError(e);
  }

  return response.json();
  });
}

// Check if the status is correct
function checkStatus(req) {

  let statusVal = req.body.taskStatus;

  // Check if the token is missing
  let missingFields = getMissingFields([["taskStatus", statusVal ]]);
  if (missingFields.length != 0) {
    let e = {'value': 'Missing fields', missingfields: missingFields };
    throw new JSONError(e);
  }

  // Check if the status is a value in the enum
  if (!Object.values(TaskStatus).includes(statusVal)) {
    let e = {'value': 'Wrong status'};
    throw new JSONError(e);
  }

  return statusVal;
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
  if (taskId == 'test') return;

  return db.collection("tasks")
      .findOne({ taskid: taskId })
      .then(task => {
        if (task == null) {
          let e = {'value': 'Task not found'};
          throw new JSONError(e);
        }
        return task;
      });
}


// Get the profile id
function getProfileId(profile) {
  return profile.user_info.id;
}

// Get the permission
function getPermission(profile) {
  return profile.user_info.permission;
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