'use strict';

// set mods
var express = require('express');
var taskRouter = express.Router();
var db = require('../db/taskDB');

//get req for task from model
//1
taskRouter.get('/', db.getTask,  (req, res) => {
  res.render('task.html.ejs', {task: res.tasks});
});

//---
//
taskRouter.post('/', db.createTask, (req, res) => {
  res.redirect(`task.html.ejs/${res.tasks[0].id}`);
});
//
taskRouter.get('z/newTask.html.ejs', (req, res) => {
  res.render('znewTask.html.ejs', {task: {name: ''}});
});


//2
taskRouter.get('/:id', db.getTask, (req, res) => {// oops I had a '/' here before path. smh I need more sleep
  res.render('showTask.html.ejs', {task: res.tasks[0]});//res.task is coming from taskDB table called tasks
});


// //--
// ----- Start of edit functionality

taskRouter.get('/:id/edit', db.getTask, (req, res) => {
  res.render('editTask.html.ejs', {task: res.tasks[0]});
});

//--fixed
taskRouter.put('/:id', db.editTask, (req, res) => {
  res.status(303).redirect(`task.html.ejs${req.params.id}`);
});

// ----- END of edit functionality
//
// taskRouter.delete('/:id', db.deleteTask, (req, res) => {
//   res.redirect('./');
// });


module.exports = taskRouter; // used by db/taskDB.js
