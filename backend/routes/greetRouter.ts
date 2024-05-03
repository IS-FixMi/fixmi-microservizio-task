/*
 *   File: greetRoutes.ts 
 *
 *   Purpose: this file contains all the routes after
 *            /api/tasks/greet
 *            It is used to greet the user with a message
 *
 */ 

import express from 'express' 

// '/api/greet'
const greetRouter = express.Router();

// GET route
greetRouter.get('/', (req, res) => {
  // Return a json
  res.json({text: `Hello World from Backend!`});
});

export default greetRouter;
