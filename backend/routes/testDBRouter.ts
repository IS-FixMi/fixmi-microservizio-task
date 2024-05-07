/*
 *   File: testDBRouter.ts 
 *
 *   Purpose: this file contains all the routes after
 *            /api/tasks/testDB
 *            It is used to test the connection to the database
 *
 */ 

import express from 'express' 

const {MongoClient} = require("mongodb");
import { db } from '../server';

// '/api/greet'
const testDBRouter = express.Router();

// GET route
testDBRouter.get('/', async (req, res) => {

  const allTasks = await db.collection("tasks").find({}).toArray();

  res.json(allTasks);
});

export default testDBRouter;
