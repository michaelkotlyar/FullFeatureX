var express = require('express');
var router = express.Router();
var User = require('../models/user');
var helper = require('../config/helpers');

module.exports = (passport) => {

  router.get('/', function(req, res, next) {
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

  router.get('/login', function(req, res, next) {
    var renderObject = { title: 'Login' };
    var warningMsg = req.flash('error');
    if (warningMsg.length !== 0) { renderObject.warning = warningMsg; }
    res.render('login', renderObject);
  });

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }));

  return router;
};
