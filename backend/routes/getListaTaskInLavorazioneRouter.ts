/*
 *   File: testDBRouter.ts 
 *
 *   Purpose: this file contains all the routes after
 *            /api/getListaTaskInlavorazione
 *            It returns all the tasks in the database
 *            that are in progress
 *
 */ 

import express from 'express' 

const {MongoClient} = require("mongodb");
import { db } from '../server';

// '/api/greet'
const getListaTaskInLavorazioneRouter = express.Router();

// GET route

getListaTaskInLavorazioneRouter.get('/', async (req, res) => {

  const allTasks = await db.collection("tasks").find({ taskStatus: 'In lavorazione' }).toArray();

  res.json(allTasks);
});

export default getListaTaskInLavorazioneRouter;
