//setup express
var express     = require('express');
//require other mod's
var morgan = require('morgan');
var bodyParser = require('body-parser');
require('dotenv').config(); // sets dotenv so that .env can be used
//--
var pg = require('pg');

//defined my task router below
var taskRouter  = require('./routes/taskRouter.js');




 //points to js file controller

//setup database info for .env

// var config = {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DB_NAME,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS
//   }



//Making changes for deploy to heroku
//
// var config = {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DB_NAME,
//     name: process.env.DB_USER,
//     password: process.env.DB_PASS
//   }

if(process.env.ENVIRONMENT === 'production'){
  var config = process.env.DATABASE_URL
  } else {
    var config = {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    }
  }


//-- require other mods here
var session         = require('express-session');
var pgSession       = require('connect-pg-simple')(session);
var path = require('path');
var methodOverride  = require('method-override');
pry                 = require('pryjs')
var db              = require('./db/pg');
//--
//call express it in our variable
var app             = express();
//tell express what our view engine will be
app.use(express.static(path.join(__dirname, 'public')));
// var taskRouter = require( path.join(__dirname, '/routes/taskRouter.js'));

// var userRoutes = require( path.join(__dirname, '/routes/users'));

//-- SET app.use

// app.use(session({
//   store: new pgSession({
//     pg : pg,
//     conString : config,
//     tableName : 'users'
//   }),
//   secret : process.env.SESSION_SECRET || 'keyForUserSession', // this digitial assigns the cookie so names can not guess another names users ID //changed and added SESSION_SECRET to .env || localhost secret for devlopment -2/28
//   saveUninitialized: false, // I turned this warning off in the terminal - 2/28
//   resave : false,
//   cookie : { maxAge : 30 * 24 * 60 * 60 * 1000 } // 30 days later this cookie will expire
// }))



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('short'));

app.use(methodOverride('_method'))


//--

app.set('views', './views');
app.set('view engine', 'ejs');// also sets express to look for views folder
//--

//set home route
// app.get('/', function(req, res){
//   res.render('index.html.ejs', { user: req.session.name});
// })
  // request name name property for this route to work ELSE denied

//-- Tell our app to use route we defined with path

app.get('/', function(req, res){
  res.render('index.html.ejs');// request name name property for this route to work ELSE denied
})

 app.use('/task.html.ejs', taskRouter);
 app.use('/showTask.html.ejs', taskRouter);
app.use('/newTask.html.ejs', taskRouter);
 app.use('/editTask.html.ejs', taskRouter);



//--

//set port app will listen on
var port      =process.env.PORT || 3000;
//start up server
app.listen(port, function(){
  console.log('http://127.0.0.1:' + port + '/');
});

// end of set up for initial express server - app dob  - 3/1@10:45pm
