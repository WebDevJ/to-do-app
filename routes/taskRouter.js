'use strict';

// set mods
var express = require('express');
var taskRouter = express.Router();
var bodyParser = require('body-parser');
// var session = require('express-session')//NEED FOR SESSION flag 1 of 3
var db = require('../db/taskDB');



// taskRouter.use(function(req, res, next) {
//   console.log(req.session)
//   if (req.session.user) {
//     next()
//   } else {
//     res.status(401).json({Result: false, data: 'Please signup on Home Page to use this App'})
//   }
// })
//NEED FOR SESSION -flag 2of3





//get req for task from model
//1
taskRouter.get('/', db.getTask,  (req, res) => {
  res.render('task.html.ejs', {task: res.tasks});
});

//---
//
taskRouter.post('/', db.createTask, (req, res) => {
  res.redirect('task.html.ejs');// donot removed /
});

// taskRouter.post('/', db.createTask, (req, res) => {
//   res.redirect(`task.html.ejs/${res.task[0].id}`);// donot removed /
// });



//
taskRouter.get('/newTask.html.ejs', (req, res) => {//keep / here infront of route
  res.render('newTask.html.ejs', {task: {name: ''}});// if 'newTask.html.ejs' dose not have '/ /' then make sure that is the case with res.render(' ').
});


//2
taskRouter.get('/:id', db.getTask, (req, res) => {// oops I had a '/' here before path. smh I need more sleep
  res.render('showTask.html.ejs', {task: res.tasks[0]});//res.task is coming from taskDB table called tasks
});


// //--
// ----- Start of edit functionality

taskRouter.get('/:id/edit', db.getTasks, (req, res) => {
  res.render('editTask.html.ejs', {task: res.tasks[0]});
});

//--fixed
taskRouter.put('/:id', db.editTask, (req, res) => {
  res.status(303).redirect('/task.html.ejs');
});

// taskRouter.put('/:id', db.editTask, (req, res) => {
//   res.status(303).redirect(`task.html.ejs/${req.params.id}`);
// });

// ----- END of edit feature
//
taskRouter.delete('/:id', db.deleteTask, (req, res) => {
  res.redirect('./');
});

//---- END of delete feature
module.exports = taskRouter; // used by db/taskDB.js
