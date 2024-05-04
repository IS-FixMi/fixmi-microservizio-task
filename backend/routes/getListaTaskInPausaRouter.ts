/*
 *   File: getlistaTaskInPausaRouter.ts 
 *
 *   Purpose: this file contains all the routes after
 *            /api/tasks/getListaTaskInPausa
 *            It returns all the tasks in the database
 *            that are in progress
 *
 */ 

import express from 'express' 
import getMissingFields from '../misc/missingFields'
import JSONError from '../misc/JSONError'
import cookieParser from 'cookie-parser'

const {MongoClient} = require("mongodb"); // DB
import { db } from '../server';

import {AUTH_IP, DEBUG} from '../server';   // Authentication


// Route:
// /api/tasks/getListaTaskInPausa
//
// method:
// POST
//
// description:
// returns all the tasks in the database that are in pause
//
// body / cookie:
// token
//
// responses:
// 200 {task1, task2, ...}
// 400 {error: "missing fields", missingFields}
// 400 {error: "user not found with the given token"}
// 400 {error: "User not authorized"}
const getListaTaskInPausaRouter = express.Router();


// Main logic
getListaTaskInPausaRouter.post('/', async (req, res) => {

  try {

    let token = getToken(req);


    // Check authentication
    getProfileInfo(token).then(profile => {


    // Get the profile id
    let profileId = getProfileId(profile);
    let permission = getPermission(profile);


    // Check authorization
    if (!isAuthorized(profile)) {
        let e = {'value': 'User not authorized'};
        throw new JSONError(e);
    }              


    // Query the DB
    executeQuery(profileId, permission).then(allTasks => {

    dbg("AllTasks", JSON.stringify(allTasks));
    
    // OK
    // Return the tasks
    res.json(allTasks);
    
    // Errors
    }).catch(e => { 
      dbg("(ERROR)", e);
      res.status(400);
      res.json(JSON.parse(e.message));
    });}).catch(e => { 
      dbg("(ERROR)", e);
      res.status(400);
      res.json(JSON.parse(e.message));
    });
  
  }
  catch(e) {
    dbg("(ERROR)", e);
    res.status(400);
    res.json(JSON.parse(e.message));
  }


});

export default getListaTaskInPausaRouter;


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

// Get the profile id
function getProfileId(profile) {
  return profile.user_info.id;
}

// Get the permission
function getPermission(profile) {
  return profile.user_info.permission;
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
async function executeQuery(profileId, permission) {

    dbg("Executing query", "");
   
    // The manager can see all the tasks in pause
    if (permission == 'Manager') {
    
      return db.collection("tasks")
          .find({ taskStatus: 'In Pausa' })
          .toArray();
    }

    return db.collection("tasks")
        .find({ 'taskStatus': 'In Pausa', 'assignedTo': profileId })
        .toArray();
}

// Prints a debug message if debug is enabled
// name: the name of the variable
// value: the value of the variable
function dbg(name, value) {
  if (!DEBUG) return;
  console.log("(DEBUG /api/tasks/getListaTaskInPausa) " + name + ": " + value);
}
