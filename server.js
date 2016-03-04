//setup express
var express     = require('express');
//call it in our variable
var app         = express();
//tell express what our view engine will be
app.set('view engine', 'ejs');// also sets express to look for views folder
//set home route
app.get('/', function(req, res){
  res.render('index.html.ejs');
});
//set port app will listen on
var port      =process.env.PORT || 3000;
//start up server
app.listen(port, function(){
  console.log('http://127.0.0.1:' + port + '/');
});
// end of set up for initial express server - app dob  - 3/1@10:45pm
