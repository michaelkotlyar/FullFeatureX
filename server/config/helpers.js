var User = require('../models/user');
var extend = require('util')._extend;

module.exports = {
  renderObject: (req, extra = {}) => {
    var renderObject = {};
    if (req.user) {
      renderObject.loggedIn = true;
      renderObject.username = req.user.user_name;
      renderObject.email = req.user.user_email;
      if (req.user.user_image) { renderObject.image = req.user.user_image; }
    }
    extend(renderObject, extra);
    return renderObject;
  },
  loggedIn: (req, res, next) => {
    if (!req.user) {
      res.redirect('/users/login');
    }
    else {
      next();
    }
  },
  adminAccess: (req, res, next) => {
    if (req.user) {
      if (req.user.user_type == 1) {
        console.log("Admin oh boy!!!!");
        next();
      }
    }
    res.redirect('/users/login');
  },
  createUser: (req, res) => {
    var renderObject = { title: 'Register' };
    User.uniqueUserUsername(req.body.username)
    .then(data => {
      if (!data.exists) {
        User.uniqueUserEmail(req.body.email)
        .then(data => {
          if (!data.exists) {
            User.addUser(req.body.username, req.body.password, req.body.email, 0);
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
