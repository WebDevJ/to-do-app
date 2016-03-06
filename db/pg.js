// var pg = require('pg');
// //var connectionString = "postgres://add ur userName: dummy password @localhost/sessions_test";
//
// var config = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS
// };
//
// var bcrypt = require('bcrypt');
// var salt = bcrypt.genSaltSync(10);
// var session = require('express-session');
//
//
// function loginUser(req, res, next) {
//     var name = req.body.name;
//     var password = req.body.password;
//
//     pg.connect(config, function(err, client, done) {
//       if (err) {
//         done()
//         console.log(err)
//         return res.status(500).json({result: false, data: err})
//       }
//
//       var query = client.query("SELECT * FROM users WHERE name LIKE ($1);", [name], function(err, results) {
//         done()
//         if (err) {
//           return console.error('error running query', err)
//         }
//
//         if (results.rows.length === 0) {
//           res.status(204).json({result: true, data: 'nothing in content'})
//         } else if (bcrypt.compareSync(password, results.rows[0].password_input)) {
//           res.rows = results.rows[0]
//           next()
//         }
//       })
//     })
// }
//
// function createSecure(name, password, callback) {
//   // hashing the password given by the user at signup
//   bcrypt.genSalt(function(err, salt) {
//     bcrypt.hash(password, salt, function(err, hash) {
//       // this callback saves the user to our databased
//       // with the hashed password
//
//       // saveUser(name, hashed)
//       callback(name, hash)
//     })
//   })
// }
//
//
// function createUser(req, res, next) {
//   createSecure(req.body.name, req.body.password, saveUser);
//
//   function saveUser(name, hash) {
//     pg.connect(config, function(err, client, done) {
//       if (err) {
//         done()
//         console.log(err)
//         return res.status(500).json({result: false, data: err})
//       }
//
//       var query = client.query("INSERT INTO users( name, password_input) VALUES ($1, $2);", [name, hash], function(err, result) {
//         done()
//         if (err) {
//           return console.error('error running query', err)
//         }
//         next()
//       })
//     })
//   }
// }
//
// module.exports.createUser = createUser;
// module.exports.loginUser = loginUser;
