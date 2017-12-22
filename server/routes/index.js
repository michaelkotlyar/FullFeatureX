var express = require('express');
var router = express.Router();
var User = require('../models/user');
var helper = require('../config/helpers');

router.get('/', helper.loggedIn, function(req, res, next) {
  var renderObject = { title: 'Dashboard', bodyClasses: ['dashboard'] };
  if (req.user) {
    renderObject.username = req.user.user_name;
  }
  res.render('index', renderObject);
});

router.get('/users', function(req, res, next) {
  User.getAllUsers()
    .then(users => {
      var renderObject = { title: 'Users', users: users };
      if (req.user) {
        renderObject.username = req.user.user_name;
      }
      res.render('users', renderObject);
    })
    .catch(error => {
      res.render('error', { error: error });
    });
});

router.get('/graphs', helper.loggedIn, function(req, res, next) {
  var renderObject = { title: 'Graphs' };
  if (req.user) {
    renderObject.username = req.user.user_name;
  }
  res.render('dashboard', renderObject);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/register', function(req, res, next) {
  helper.createUser(req, res);
});

router.get('/profile', helper.loggedIn, function(req, res, next) {
  var renderObject = { title: 'Profile' };
  if (req.user) {
    renderObject.username = req.user.user_name;
    renderObject.email = req.user.user_email;
    if (req.user.user_image) { renderObject.image = req.user.user_image; }
  }
  res.render('profile', renderObject);
});

router.post('/profile', helper.loggedIn, function(req, res, next) {
  helper.modifyUser(req, res);
});

module.exports = router;
