var express = require('express');
var router = express.Router();
var User = require('../models/user');
var helper = require('../config/helpers');

module.exports = (passport) => {

  router.get('/', function(req, res, next) {
    User.getAllUsers()
      .then(users => {
        var renderObject = helper.renderObject(req, {
          title: 'Users',
          users: users
        });
        res.render('users', renderObject);
      })
      .catch(error => {
        res.render('error', { error: error });
      });
  });

  router.get('/register', function(req, res, next) {
    var renderObject = helper.renderObject(req, {
      title: 'Register'
    });
    res.render('register', renderObject);
  });

  router.post('/register', function(req, res, next) {
    helper.createUser(req, res);
  });

  router.get('/profile', helper.loggedIn, function(req, res, next) {
    var renderObject = helper.renderObject(req, {
      title: 'Profile'
    });
    res.render('profile', renderObject);
  });

  router.get('/login', function(req, res, next) {
    var renderObject = helper.renderObject(req, {
      title: 'Login'
    });
    var warningMsg = req.flash('error');
    if (warningMsg.length !== 0) { renderObject.warning = warningMsg; }
    res.render('login', renderObject);
  });

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }));

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/users/login');
  });

  return router;
};
