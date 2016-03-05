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

//---
//// REMEMBER to change name here to =>( '.get1Task' )so it dose not crash the above function
// module.exports.getTask = (req, res, next) => {
//   pg.connect(config, (err, client, done) => {
//     if (err) {
//       done();
//       console.log(err);
//       res.status(500).json({result: false, data: err});
//     }
//
//     client.query('SELECT * FROM tasks WHERE id = $1', [req.params.id], (err, results) => {
//       done();
//
//       if (err) {
//         console.error('Error with query', err);
//       }
//
//       res.tasks = results.rows;
//       next();
//     });
//   });
//
// };
// //-- 0
//
module.exports.createTask = (req, res, next) => {
  pg.connect(config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({result: false, data: err});
    }

    client.query('INSERT INTO task (name) VALUES ($1) RETURNING id', [req.body.name], (err, results) => {
      done();

      if (err) {
        console.error('Error with query', err);
      }

      res.tasks = results.rows;
      next();
    });
  });

};
//

//- edit
module.exports.editTask = (req, res, next) => {
  pg.connect(config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({result: false, data: err});
    }


    client.query('UPDATE tasks SET name = $1 WHERE id = $2', [req.body.name, req.params.id], (err, results) => {
      done();

      if (err) {
        console.error('Error with query', err);
      }

      next();
    });

  });

};
// - delete
module.exports.deleteTask = (req, res, next) => {
  pg.connect(config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({result: false, data: err});
    }


    client.query('DELETE FROM tasks WHERE id = $1', [req.params.id], (err, results) => {
      done();

      if (err) {
        console.error('Error with query', err);
      }

      next();
    });

  });

};
