'use strict';

var pg = require('pg');

var config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};
// get my task from database
module.exports.getTask = (req, res, next) => {
  pg.connect(config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({result: false, data: err});
    }

    client.query('SELECT * FROM tasks ORDER BY id', (err, results) => {
      done();
//query getting all task from model
      if (err) {
        console.error('Error with query', err);
      }
      res.tasks = results.rows;
      next();
    });
  });
};
