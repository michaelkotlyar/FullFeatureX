var express = require('express');
var router = express.Router();
var User = require('../controllers/users');
var helper = require('../config/helpers');

module.exports = function(passport) {

  router.get('/', function(req, res, next) {
    User.getAll()
      .then(function(users) {
        var renderObject = helper.renderObject(req, {
          title: 'Users',
          users: users
        });
        res.render('users', renderObject);
        return users;
      })
      .catch(function(error) {
        res.status(500).send({ error: 'Something failed!' });
      });
  });

  router.get('/register', function(req, res, next) {
    var renderObject = helper.renderObject(req, {
      title: 'Register'
    });
    res.render('register', renderObject);
  });

  router.post('/register', function(req, res, next) {
    User.create(req)
      .then(function(user) {
        res.redirect('/users/login');
      })
      .catch(function(error) {
        console.log(error);
        res.status(500).send({ error: 'Something failed!' });
      });
  });

  router.get('/profile', helper.loggedIn, function(req, res, next) {
    var renderObject = helper.renderObject(req, {
      title: 'Profile',
      bodyClasses: ['profile']
    });
    res.render('profile', renderObject);
  });

  router.post('/profile', helper.loggedIn, function(req, res, next) {
    User.edit(req, res, next)
      .then(function() {
        res.redirect('/users/profile');
      });
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
