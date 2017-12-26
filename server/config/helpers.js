var User = require('../models/user');
var bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);

module.exports = {
  loggedIn: (req, res, next) => {
    if (!req.user) {
      res.redirect('/users/login');
    }
    else {
      next();
    }
  },
  createUser: (req, res) => {
    var renderObject = { title: 'Register' };
    User.uniqueUserUsername(req.body.username)
    .then(data => {
      if (!data[0].exists) {
        User.uniqueUserEmail(req.body.email)
        .then(data => {
          if (!data[0].exists) {
            var hash = bcrypt.hashSync(req.body.password, salt);
            User.addUser(req.body.username, hash, req.body.email, 0);
            res.redirect('/users/login');
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
  },
  modifyUser: (req, res) => {
    var changeUsername = false, changeEmail = false, changeImage = false;
    if (req.username !== req.body.username && req.username !== '') changeUsername = true;
    if (req.email !== req.body.email && req.email !== '') changeEmail = true;
    if (req.image) changeImage = true;
  }
};
