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

const {MongoClient} = require("mongodb"); // DB
import { db } from '../server';

import {AUTH_IP} from '../server';   // Authentication


// Allow debug prints
const debug = true;

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
// 400 {error: "user not found with the given token"}
// 400 {error: "User not authorized"}
const getListaTaskDaEseguireRouter = express.Router();


// Main logic
getListaTaskDaEseguireRouter.post('/', async (req, res) => {

  try {
    let token = getToken(req);

    // Check authentication
    getProfileInfo(token).then(profile => {

    // Check authorization
    if (!isAuthorized(profile)) {
        let e = {'value': 'User not authorized'};
        throw new JSONError(e);
    }              

    // Query the DB
    executeQuery().then(allTasks => {

    dbg("AllTasks", JSON.stringify(allTasks));
    
    // Return the tasks
    res.json(allTasks);
    
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

export default getListaTaskDaEseguireRouter;


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
        .find({ taskStatus: 'Da Eseguire' })
        .toArray();
}

// Prints a debug message if debug is enabled
// name: the name of the variable
// value: the value of the variable
function dbg(name, value) {
  if (!debug) return;
  console.log("(DEBUG /api/tasks/getListaTaskDaEseguire) " + name + ": " + value);
}
