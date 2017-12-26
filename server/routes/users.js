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