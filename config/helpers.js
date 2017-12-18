var db = require('./database');
var bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);

function loggedIn(req, res, next) {
  if (!req.user) {
    res.redirect('/login');
  }
  else {
    next();
  }
}

function createUser(req, res) {
  renderObject = { title: "Register" };
  db.uniqueUserUsername(req.body.username)
    .then(data => {
      if (!data[0].exists) {
        db.uniqueUserEmail(req.body.email)
          .then(data => {
            if (!data[0].exists) {
              var hash = bcrypt.hashSync(req.body.password, salt);
              db.registerUser(req.body.username, hash, req.body.email);
              res.redirect('/login');
            }
            else {
              renderObject.warning = 'This email is already taken.';
              res.render('register', renderObject);
            }
          })
          .catch(error => {
            console.log('error: ' + error);
          });
      }
      else {
        renderObject.warning = 'This username is already taken.';
        res.render('register', renderObject);
      }
    })
    .catch(error => {
      console.log('error: ' + error);
    });
}

module.exports = {
  loggedIn,
  createUser
};
