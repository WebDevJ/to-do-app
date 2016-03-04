'use strict';

// set mods
var express = require('express');
var taskRouter = express.Router();
var db = require('../db/taskDB');

//get req for task from model
taskRouter.get('/', db.getTask,  (req, res) => {
  res.render('task.html.ejs', {task: res.tasks}); 
});

module.exports = taskRouter; // used by db/taskDB.js
