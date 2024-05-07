/*
 *   File: app.ts 
 *
 *   Purpose: this file contains the main code for the back-end server 
 *
 */ 


// Express
import express from 'express';
import bodyParser from "body-parser";
const cookieParser = require("cookie-parser");


// Routes
import greetRouter from './routes/greetRouter';
import testTaskRouter from './routes/testTaskRouter';
import testDBRouter from './routes/testDBRouter';
import getListaTaskInLavorazioneRouter from './routes/getListaTaskInLavorazioneRouter';
import getListaTaskDaEseguireRouter from './routes/getListaTaskDaEseguireRouter';
import getListaTaskInPausaRouter from './routes/getListaTaskInPausaRouter';
import creaTaskRouter from './routes/creaTaskRouter';
import scegliTaskRouter from './routes/scegliTaskRouter';
import modificaStatoTaskRouter from './routes/modificaStatoTaskRouter';
import getStoricoTaskRouter from './routes/getStoricoTaskRouter';


// Get variables from .env file
require('dotenv').config();


// Allow debug prints
export const DEBUG = true;


const app = express();
const port = process.env.REACT_APP_BACKEND_PORT || 3001;



// ------------ AUTH SERVER -------------

export const AUTH_IP = process.env.MICROSERVIZIO_AUTH_IP || "10.5.0.11";



// ------------ MONGODB -------------

// Setup MongoDB
const {MongoClient} = require("mongodb");
let db

const DB_USERNAME = process.env.MICROSERVIZIO_DB_USERNAME || "fixme";
const DB_PASSWORD = process.env.MICROSERVIZIO_DB_PASSWORD || "fixme";
const DB_IP = process.env.MICROSERVIZIO_DB_IP || "10.5.0.10";
const DB_PORT = "27017";
const DB_NAME = "Tasks";

// Connect to the database
async function startDB() {
  const client = new MongoClient("mongodb://" + DB_USERNAME +
                                 ":" + DB_PASSWORD + "@"
                                 + DB_IP + ":" + DB_PORT +
                                 "/" + DB_NAME +"?&authSource=admin");
  // Let's wait for the connection
  await client.connect();
  // This return the database
  db = client.db();
}

startDB()

export { db };



// ------------ SAME ORIGIN POLICY  -------------
//
// We need to disable Same Origin Policy since the 
// frontend and the backend run on different servers,
// the frontend must send requests to a server that 
// is not itself, breaking the SOP
//
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
  });



// ------------ MIDDLEWARE -------------

app.use(bodyParser.urlencoded());
app.use(cookieParser());



// ------------------ ROUTES ------------------

app.use("/api/tasks/greet", greetRouter);
app.use("/api/tasks/testTask", testTaskRouter);
app.use("/api/tasks/testDB", testDBRouter);
app.use("/api/tasks/getListaTaskInLavorazione", getListaTaskInLavorazioneRouter);
app.use("/api/tasks/getListaTaskDaEseguire", getListaTaskDaEseguireRouter);
app.use("/api/tasks/getListaTaskInPausa", getListaTaskInPausaRouter);
app.use("/api/tasks/creaTask", creaTaskRouter);
app.use("/api/tasks/scegliTask", scegliTaskRouter);
app.use("/api/tasks/modificaStatoTask", modificaStatoTaskRouter);
app.use("/api/tasks/getStoricoTask", getStoricoTaskRouter);





// Run server
app.listen(port, () => {
  return console.log(`Express is listening at http://127.0.0.1:${port}`);
});
